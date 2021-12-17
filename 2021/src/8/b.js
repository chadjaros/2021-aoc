"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const setmath_1 = require("../../utils/setmath");
function overlapsWith(a, b) {
    return (0, setmath_1.setEq)((0, setmath_1.intersection)(a, b), a);
}
function main() {
    const inputSets = input_1.input8.map((i) => {
        return {
            input: i.input.map((x) => new Set(x.split(''))),
            output: i.output.map((x) => new Set(x.split(''))),
        };
    });
    let sum = 0;
    for (const v of inputSets) {
        const remaining = new Set([...v.input]);
        const one = new input_1.Digit(1, [...remaining].find((x) => { var _a; return x.size === ((_a = input_1.Digits.get(1)) === null || _a === void 0 ? void 0 : _a.count); }));
        const four = new input_1.Digit(4, [...remaining].find((x) => { var _a; return x.size === ((_a = input_1.Digits.get(4)) === null || _a === void 0 ? void 0 : _a.count); }));
        const seven = new input_1.Digit(7, [...remaining].find((x) => { var _a; return x.size === ((_a = input_1.Digits.get(7)) === null || _a === void 0 ? void 0 : _a.count); }));
        const eight = new input_1.Digit(8, [...remaining].find((x) => { var _a; return x.size === ((_a = input_1.Digits.get(8)) === null || _a === void 0 ? void 0 : _a.count); }));
        remaining.delete(one.panels);
        remaining.delete(four.panels);
        remaining.delete(seven.panels);
        remaining.delete(eight.panels);
        const three = new input_1.Digit(3, [...remaining].find((x) => x.size === 5 && overlapsWith(seven.panels, x)));
        remaining.delete(three.panels);
        const nine = new input_1.Digit(9, [...remaining].find((x) => x.size === 6 && overlapsWith(four.panels, x)));
        remaining.delete(nine.panels);
        const zero = new input_1.Digit(0, [...remaining].find((x) => x.size === 6 && overlapsWith(one.panels, x)));
        remaining.delete(zero.panels);
        const six = new input_1.Digit(6, [...remaining].find((x) => x.size === 6));
        remaining.delete(six.panels);
        const five = new input_1.Digit(5, [...remaining].find((x) => overlapsWith(x, six.panels)));
        remaining.delete(five.panels);
        const two = new input_1.Digit(2, [...remaining].find((x) => true));
        const digits = [zero, one, two, three, four, five, six, seven, eight, nine];
        let mult = 1000;
        let number = 0;
        for (const o of v.output) {
            const d = digits.find((x) => (0, setmath_1.setEq)(x.panels, o));
            number += d.number * mult;
            mult = mult / 10;
        }
        sum += number;
    }
    console.log(sum);
}
main();
//# sourceMappingURL=b.js.map