"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
let string = input_1.input14start;
const rules = input_1.input14rules;
const start = string[0];
let tuples = new Map();
let tuplesNext = new Map();
for (let i = 0; i < string.length - 1; i++) {
    const tup = string.slice(i, i + 2);
    tuples.set(tup, ((_a = tuples.get(tup)) !== null && _a !== void 0 ? _a : 0) + 1);
}
// console.log(start, tuples)
for (let round = 0; round < 40; round++) {
    for (const [tuple, count] of tuples) {
        const insertion = rules.get(tuple);
        if (insertion) {
            const tupleOne = tuple[0] + insertion;
            const tupleTwo = insertion + tuple[1];
            tuplesNext.set(tupleOne, ((_b = tuplesNext.get(tupleOne)) !== null && _b !== void 0 ? _b : 0) + count);
            tuplesNext.set(tupleTwo, ((_c = tuplesNext.get(tupleTwo)) !== null && _c !== void 0 ? _c : 0) + count);
        }
        else {
            tuplesNext.set(tuple, ((_d = tuplesNext.get(tuple)) !== null && _d !== void 0 ? _d : 0) + count);
        }
    }
    tuples = tuplesNext;
    tuplesNext = new Map();
}
const counts = new Map();
for (const [tup, count] of tuples) {
    const l = tup[1];
    counts.set(l, ((_e = counts.get(l)) !== null && _e !== void 0 ? _e : 0) + count);
}
counts.set(start, ((_f = counts.get(start)) !== null && _f !== void 0 ? _f : 0) + 1);
const sorted = [...counts].sort((a, b) => b[1] - a[1]);
console.log(sorted);
console.log(sorted[0][1] - sorted[sorted.length - 1][1]);
//# sourceMappingURL=b.js.map