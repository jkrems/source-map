"use strict";
/**
 * @license
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 * SPDX-License-Identifier: BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
// Note: This file is replaced with "read-wasm-browser.js" when this module is
// bundled with a packager that takes package.json#browser fields into account.
const fs_1 = require("fs");
const path_1 = require("path");
async function readWasm() {
    const wasmPath = (0, path_1.join)(__dirname, "mappings.wasm");
    const data = await fs_1.promises.readFile(wasmPath);
    return data.buffer;
}
exports.default = readWasm;
;
const initialize = (source) => {
    console.debug("SourceMapConsumer.initialize is a no-op when running in node.js");
};
exports.initialize = initialize;
