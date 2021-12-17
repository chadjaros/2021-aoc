"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function cost(value, target) {
    return Math.abs(target - value);
}
function main() {
    let max = -1;
    let min = 2000000;
    let sum = 0;
    for (const value of input_1.input7) {
        if (value > max) {
            max = value;
        }
        if (value < min) {
            min = value;
        }
        sum += value;
    }
    const avg = sum / input_1.input7.length;
    let minSum = 2000000000;
    let index = -1;
    for (let i = min; i <= max; i++) {
        let sum = 0;
        for (const value of input_1.input7) {
            sum += cost(value, i);
        }
        if (sum < minSum) {
            minSum = sum;
            index = i;
        }
    }
    console.log('average', avg, 'index', index, minSum);
}
main();
//# sourceMappingURL=a.js.map