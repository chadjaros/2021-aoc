"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    let prev = input_1.input1[0] + input_1.input1[1] + input_1.input1[2];
    let current = 0;
    let count = 0;
    for (let i = 3; i < input_1.input1.length; i++) {
        current = input_1.input1[i] + input_1.input1[i - 1] + input_1.input1[i - 2];
        if (current > prev) {
            count++;
        }
        prev = current;
    }
    console.log(count);
}
main();
//# sourceMappingURL=b.js.map