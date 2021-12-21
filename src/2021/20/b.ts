import { binToDec } from '../../utils/base-conversion';
import { Point } from '../../utils/point-2d';
import { input20enhance, input20map, orderedAdjacents } from './input';

const enhance = input20enhance;
let current = input20map;
let next: typeof current = new Map();
let unknownLit = false;
for (let round = 0; round < 50; round++) {
    console.log([...current.values()].filter((a) => a.lit).length, unknownLit);

    const min: Point = new Point(0, 0);
    const max: Point = new Point(0, 0);
    current.forEach((value) => {
        if (value.p.x < min.x) {
            min.x = value.p.x;
        }
        if (value.p.y < min.y) {
            min.y = value.p.y;
        }
        if (value.p.x > max.x) {
            max.x = value.p.x;
        }
        if (value.p.y > max.y) {
            max.y = value.p.y;
        }
    });

    for (let x = min.x - 1; x <= max.x + 1; x++) {
        for (let y = min.y - 1; y <= max.y + 1; y++) {
            const point = new Point(x, y);
            const value = current.get(point.key) ?? {p: point, lit: unknownLit};
            const adjacents = orderedAdjacents(value.p);
            const lit = enhance[binToDec(adjacents.map((p) => current.get(p.key)?.lit ?? unknownLit))] === '#';

            next.set(value.p.key, {p: value.p, lit}); 
        }
    }
    
    unknownLit = enhance[unknownLit ? 511 : 0] === '#';
    current = next;
    next = new Map();
}

console.log([...current.values()].filter((a) => a.lit).length, unknownLit);