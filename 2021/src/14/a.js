"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
let string = input_1.input14start;
const rules = input_1.input14rules;
for (let round = 0; round < 10; round++) {
    for (let i = 0; i < string.length - 1; i++) {
        // console.log(round, i, string.slice(i, i+2));
        const insertion = rules.get(string.slice(i, i + 2));
        if (insertion) {
            // console.log(string, i, insertion);
            string = string.slice(0, i + 1) + insertion + string.slice(i + 1);
            i++;
            // console.log(string);
        }
    }
}
const counts = new Map();
for (let l of string) {
    counts.set(l, ((_a = counts.get(l)) !== null && _a !== void 0 ? _a : 0) + 1);
}
const sorted = [...counts].sort((a, b) => b[1] - a[1]);
console.log(sorted);
console.log(sorted[0][1] - sorted[sorted.length - 1][1]);
//# sourceMappingURL=a.js.map