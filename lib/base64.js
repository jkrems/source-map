"use strict";
/**
 * @license
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 * SPDX-License-Identifier: BSD-3-Clause
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
const intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
function encode(number) {
    if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
}
exports.encode = encode;
