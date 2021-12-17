"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    let x = 0;
    let depth = 0;
    let aim = 0;
    for (const v of input_1.input2) {
        if (v.dir === input_1.Direction.Down) {
            aim += v.distance;
        }
        else if (v.dir === input_1.Direction.Up) {
            aim -= v.distance;
        }
        else if (v.dir === input_1.Direction.Forward) {
            x += v.distance;
            depth += aim * v.distance;
        }
    }
    console.log(x, depth, x * depth);
}
main();
//# sourceMappingURL=b.js.map