/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 * SPDX-License-Identifier: BSD-3-Clause
 */

import readWasm from "./read-wasm";

/**
 * Provide the JIT with a nice shape / hidden class.
 */
class Mapping {
  generatedLine = 0;
  generatedColumn = 0;
  lastGeneratedColumn: number|null = null;
  source: string|null = null;
  originalLine: number|null = null;
  originalColumn: number|null = null;
  name: string|null = null;
}

let cachedWasm: Promise<ArrayBuffer>|null = null;

interface Callback {
  (m: Mapping): void;
}

export default function wasm() {
  if (cachedWasm) {
    return cachedWasm;
  }

  const callbackStack: Callback[] = [];

  cachedWasm = readWasm()
    .then(buffer => {
      return WebAssembly.instantiate(buffer, {
        env: {
          mapping_callback(
            generatedLine: number,
            generatedColumn: number,

            hasLastGeneratedColumn: boolean,
            lastGeneratedColumn: number,

            hasOriginal: boolean,
            source: string,
            originalLine: number,
            originalColumn: number,

            hasName: boolean,
            name: string
          ) {
            const mapping = new Mapping();
            // JS uses 1-based line numbers, wasm uses 0-based.
            mapping.generatedLine = generatedLine + 1;
            mapping.generatedColumn = generatedColumn;

            if (hasLastGeneratedColumn) {
              // JS uses inclusive last generated column, wasm uses exclusive.
              mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
            }

            if (hasOriginal) {
              mapping.source = source;
              // JS uses 1-based line numbers, wasm uses 0-based.
              mapping.originalLine = originalLine + 1;
              mapping.originalColumn = originalColumn;

              if (hasName) {
                mapping.name = name;
              }
            }

            callbackStack[callbackStack.length - 1](mapping);
          },

          start_all_generated_locations_for() {
            console.time("all_generated_locations_for");
          },
          end_all_generated_locations_for() {
            console.timeEnd("all_generated_locations_for");
          },

          start_compute_column_spans() {
            console.time("compute_column_spans");
          },
          end_compute_column_spans() {
            console.timeEnd("compute_column_spans");
          },

          start_generated_location_for() {
            console.time("generated_location_for");
          },
          end_generated_location_for() {
            console.timeEnd("generated_location_for");
          },

          start_original_location_for() {
            console.time("original_location_for");
          },
          end_original_location_for() {
            console.timeEnd("original_location_for");
          },

          start_parse_mappings() {
            console.time("parse_mappings");
          },
          end_parse_mappings() {
            console.timeEnd("parse_mappings");
          },

          start_sort_by_generated_location() {
            console.time("sort_by_generated_location");
          },
          end_sort_by_generated_location() {
            console.timeEnd("sort_by_generated_location");
          },

          start_sort_by_original_location() {
            console.time("sort_by_original_location");
          },
          end_sort_by_original_location() {
            console.timeEnd("sort_by_original_location");
          }
        }
      });
    })
    .then(Wasm => {
      return {
        exports: Wasm.instance.exports,
        withMappingCallback: (mappingCallback: Callback, f: Function) => {
          callbackStack.push(mappingCallback);
          try {
            f();
          } finally {
            callbackStack.pop();
          }
        }
      };
    })
    .then(null, e => {
      cachedWasm = null;
      throw e;
    });

  return cachedWasm;
};
