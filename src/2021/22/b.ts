import { BoundingBox3, Vector3 } from '../../ts-utils/point-3d';
import { input22 } from './input';

const input = input22;

const half = Vector3.fromCoordinates(0.5, 0.5, 0.5);
const lit = new Set<BoundingBox3>();

input.forEach((i) => {
    // adjust the bounding boxes so that they encapsulate the right amount of volume
    const bb = new BoundingBox3(i.min.minus(half), i.max.plus(half));

    [...lit].forEach((candidate) => {
        const splits = bb.intersectionAndRemainder(candidate);
        if (splits) {
            lit.delete(candidate);
            splits.segments.forEach((x) => lit.add(x));
        }
    });
    if (i.on) {
        lit.add(bb);
    }
});

console.log([...lit].reduce((a, x) => a + x.volume, 0));

const fiftyfifty = BoundingBox3.fromCoordinates(
    -50.5,
    -50.5,
    -50.5,
    50.5,
    50.5,
    50.5
);
console.log(
    [...lit]
        .map((l) => {
            const int = fiftyfifty.intersection(l);
            if (int) {
                return int;
            }
            return;
        })
        .filter((x) => x !== undefined)
        .reduce((a, x) => a + (x?.volume ?? 0), 0)
);
