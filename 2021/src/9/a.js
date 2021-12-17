"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    let sum = 0;
    for (let y = 0; y < input_1.input9.length; y++) {
        for (let x = 0; x < input_1.input9[0].length; x++) {
            const point = input_1.input9[y][x];
            const belowAbove = y > 0 ? point < input_1.input9[y - 1][x] : true;
            const belowBelow = y < input_1.input9.length - 1 ? point < input_1.input9[y + 1][x] : true;
            const belowLeft = x > 0 ? point < input_1.input9[y][x - 1] : true;
            const belowRight = x < input_1.input9[0].length - 1 ? point < input_1.input9[y][x + 1] : true;
            if (belowAbove && belowBelow && belowLeft && belowRight) {
                console.log('low point', x, y, point);
                sum += point + 1;
            }
        }
    }
    console.log(sum);
}
main();
//# sourceMappingURL=a.js.map