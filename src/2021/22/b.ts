import { BoundingBox3, Vector3 } from '../../utils/point-3d';
import { input22 } from './input';

const input = input22;

const half = Vector3.fromCoordinates(.5, .5, .5);
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

let sum = 0;
for (const b of lit) {
    sum += b.volume;
}

console.log(sum);