"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const stack_1 = require("../../utils/stack");
function main() {
    var _a, _b;
    let sum = 0;
    for (const s of input_1.input10) {
        const stack = new stack_1.Stack();
        console.log(s);
        let position = 0;
        for (const l of s) {
            const chunk = input_1.lookup10.get(l);
            if (l === chunk.start) {
                stack.push(chunk.start);
            }
            else if (l === chunk.end && l === ((_a = input_1.lookup10.get(stack.end)) === null || _a === void 0 ? void 0 : _a.end)) {
                stack.pop();
            }
            else if (l === chunk.end) {
                // corrupt
                console.log('corrupt', l, 'expected', (_b = input_1.lookup10.get(stack.end)) === null || _b === void 0 ? void 0 : _b.end, 'position', position);
                stack.pop();
                sum += chunk.value;
            }
            position++;
        }
    }
    console.log(sum);
}
main();
//# sourceMappingURL=a.js.map