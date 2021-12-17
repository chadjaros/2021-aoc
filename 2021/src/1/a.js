"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    let count = 0;
    for (let i = 1; i < input_1.input1.length; i++) {
        if (input_1.input1[i] > input_1.input1[i - 1]) {
            count++;
        }
    }
    console.log('count:', count);
}
main();
//# sourceMappingURL=a.js.map