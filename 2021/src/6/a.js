"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    let current = [...input_1.input6];
    let next = [];
    for (let day = 0; day < 80; day++) {
        next = [];
        for (let i = 0; i < current.length; i++) {
            const nextval = current[i] - 1;
            if (nextval === -1) {
                next.push(6);
                next.push(8);
            }
            else {
                next.push(nextval);
            }
        }
        current = next;
    }
    console.log(current.length);
}
main();
//# sourceMappingURL=a.js.map