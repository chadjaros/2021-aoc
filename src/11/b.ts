import { adjacents, Cavern, input11, input11mini } from './input';
import { Point } from '../5/input';

function main() {

    const map = new Cavern(input11);

    function checkFlash(p: Point) {

        const l = map.get(p);

        if (!l.flashed && l.value > 9) {

            l.flashed = true;
            // console.log('checkFlash', p, l, flashes);

            const adj = adjacents(p).filter((p) => map.pointIsValid(p));
            for (const a of adj) {
                map.get(a).value += 1;
                checkFlash(a);
            }
        }
    }

    let round = 0;
    let exit = false;
    while(!exit) {
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
