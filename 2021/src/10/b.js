"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const stack_1 = require("../../utils/stack");
function main() {
    var _a;
    let completionScores = [];
    for (const s of input_1.input10) {
        const stack = new stack_1.Stack();
        let isCorrupt = false;
        for (const l of s) {
            const chunk = input_1.lookup10.get(l);
            if (l === chunk.start) {
                stack.push(chunk);
            }
            else if (l === chunk.end && l === stack.end.end) {
                stack.pop();
            }
            else if (l === chunk.end) {
                // corrupt
                // console.log('corrupt', l, 'expected', lookup10.get(stack.end)?.end, 'position', position);
                stack.pop();
                isCorrupt = true;
            }
        }
        if (!isCorrupt && stack.size > 0) {
            let sum = 0;
            while (stack.size > 0) {
                sum = sum * 5 + ((_a = stack.pop()) === null || _a === void 0 ? void 0 : _a.otherValue);
            }
            completionScores.push(sum);
        }
    }
    completionScores.sort((a, b) => a - b);
    console.log(completionScores.length, Math.floor(completionScores.length / 2));
    console.log(completionScores[Math.floor(completionScores.length / 2)]);
}
main();
//# sourceMappingURL=b.js.map