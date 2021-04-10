/**
 * @license
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Note: This file is replaced with "read-wasm-browser.js" when this module is
// bundled with a packager that takes package.json#browser fields into account.

import {promises as fs} from "fs";
import {join} from "path";

export default async function readWasm(): Promise<ArrayBuffer> {
  const wasmPath = join(__dirname, "mappings.wasm");
  const data = await fs.readFile(wasmPath);
  return data.buffer;
};

export const initialize = (source: string|ArrayBuffer) => {
  console.debug(
    "SourceMapConsumer.initialize is a no-op when running in node.js"
  );
};
