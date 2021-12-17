"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    var _a, _b, _c, _d;
    let count = 0;
    const knownDigits = new Set([(_a = input_1.Digits.get(1)) === null || _a === void 0 ? void 0 : _a.count, (_b = input_1.Digits.get(4)) === null || _b === void 0 ? void 0 : _b.count, (_c = input_1.Digits.get(7)) === null || _c === void 0 ? void 0 : _c.count, (_d = input_1.Digits.get(8)) === null || _d === void 0 ? void 0 : _d.count]);
    for (const v of input_1.input8) {
        for (const n of v.output) {
            if (knownDigits.has(n.length)) {
                count++;
            }
        }
    }
    console.log(count);
}
main();
//# sourceMappingURL=a.js.map