"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
let mappingsWasm = null;
function readWasm() {
    if (typeof mappingsWasm === "string") {
        return fetch(mappingsWasm).then(response => response.arrayBuffer());
    }
    if (mappingsWasm instanceof ArrayBuffer) {
        return Promise.resolve(mappingsWasm);
    }
    throw new Error("You must provide the string URL or ArrayBuffer contents " +
        "of lib/mappings.wasm by calling " +
        "SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) " +
        "before using SourceMapConsumer");
}
exports.default = readWasm;
const initialize = (input) => {
    mappingsWasm = input;
};
exports.initialize = initialize;
