"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedList = void 0;
const binary_search_1 = require("./binary-search");
class OrderedList {
    constructor(comparator) {
        this.comparator = comparator;
        this.list = [];
    }
    queue(value) {
        // const i = this.list.findIndex((i) => this.comparator(value, i) < 0);
        const i = (0, binary_search_1.binarySearch)(this.list, value, this.comparator).index;
        if (i >= 0) {
            this.list.splice(i, 0, value);
        }
        else {
            this.list.push(value);
        }
    }
    peek() {
        return this.list[0];
    }
    dequeue() {
        const x = this.list[0];
        this.list.splice(0, 1);
        return x;
    }
    get values() {
        return this.list;
    }
    delete(func) {
        const i = this.list.findIndex(func);
        if (i >= 0) {
            this.list.splice(i, 1);
        }
    }
}
exports.OrderedList = OrderedList;
// const s = new SortedList<number>((a, b) => a-b);
// s.queue(5);
// s.queue(3);
// s.queue(2);
// s.queue(1);
// s.queue(6);
// s.queue(4);
// console.log(s.values);
// s.delete((x) => x === 3);
// console.log(s.values);
//# sourceMappingURL=ordered-list.js.map