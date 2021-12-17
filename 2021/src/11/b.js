"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function main() {
    const map = new input_1.Cavern(input_1.input11);
    function checkFlash(p) {
        const l = map.get(p);
        if (!l.flashed && l.value > 9) {
            l.flashed = true;
            // console.log('checkFlash', p, l, flashes);
            const adj = (0, input_1.adjacents)(p).filter((p) => map.pointIsValid(p));
            for (const a of adj) {
                map.get(a).value += 1;
                checkFlash(a);
            }
        }
    }
    let round = 0;
    let exit = false;
    while (!exit) {
        round++;
        // console.log('round', round);
        map.forEach((p) => {
            map.get(p).value += 1;
        });
        map.forEach((p) => {
            checkFlash(p);
        });
        exit = map.every((l) => l.flashed);
        // Reset
        map.forEach((p) => {
            const l = map.get(p);
            if (l.flashed) {
                l.value = 0;
                l.flashed = false;
            }
        });
    }
    console.log('round', round);
}
main();
//# sourceMappingURL=b.js.map