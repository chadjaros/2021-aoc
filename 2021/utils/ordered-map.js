"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedMap = void 0;
const binary_search_1 = require("./binary-search");
class OrderedMap {
    constructor(comparator) {
        this.map = new Map();
        this.list = [];
        this.comparator = (a, b) => comparator(a[1], b[1]);
    }
    set(key, value) {
        if (this.map.has(key)) {
            this.delete(key);
        }
        const entry = [key, value];
        const i = (0, binary_search_1.binarySearch)(this.list, entry, this.comparator).index;
        if (i >= 0) {
            this.list.splice(i, 0, entry);
        }
        else {
            this.list.push(entry);
        }
        this.map.set(key, value);
    }
    has(key) {
        return this.map.has(key);
    }
    get(key) {
        return this.map.get(key);
    }
    front() {
        return this.list[0];
    }
    popFront() {
        const x = this.list[0];
        this.list.splice(0, 1);
        this.map.delete(x[0]);
        return x;
    }
    get values() {
        return [...this.list];
    }
    delete(key) {
        if (this.map.has(key)) {
            const value = this.map.get(key);
            const i = (0, binary_search_1.binarySearch)(this.list, [key, value], this.comparator).index;
            if (i >= 0) {
                this.list.splice(i, 1);
            }
            this.map.delete(key);
            return [key, value];
        }
        return;
    }
}
exports.OrderedMap = OrderedMap;
// const s = new OrderedMap<number, number>((a, b) => a-b);
// s.set(5, 5);
// s.set(3, 3);
// s.set(2, 2);
// s.set(1, 1);
// s.set(6, 6);
// s.set(4, 4);
// console.log(s.values);
// s.delete(3);
// console.log(s.values);
//# sourceMappingURL=ordered-map.js.map