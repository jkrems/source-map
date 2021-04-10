/**
 * @license
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
export class ArraySet {
  private _array: string[] = [];
  private _set = new Map<string, number>();

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  static fromArray(aArray: string[], aAllowDuplicates: boolean): ArraySet {
    const set = new ArraySet();
    for (let i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  }

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   */
  size(): number {
    return this._set.size;
  }

  /**
   * Add the given string to this set.
   */
  add(aStr: string, aAllowDuplicates: boolean) {
    const isDuplicate = this.has(aStr);
    const idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set.set(aStr, idx);
    }
  }

  /**
   * Is the given string a member of this set?
   */
  has(aStr: string): boolean {
    return this._set.has(aStr);
  }

  /**
   * What is the index of the given string in the array?
   */
  indexOf(aStr: string): number {
    const idx = this._set.get(aStr);
    if (idx !== undefined && idx >= 0) {
      return idx;
    }
    throw new Error('"' + aStr + '" is not in the set.');
  }

  /**
   * What is the element at the given index?
   */
  at(aIdx: number): string {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error("No element indexed by " + aIdx);
  }

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  toArray(): string[] {
    return this._array.slice();
  }
}
