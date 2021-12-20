import { allScanners20 } from './a';

const input = [...allScanners20.values()].map((x) => x.translation);

const maxDistance = input.reduce((max, a) => {
    const m = input.reduce((max2, b) => {
        const n = b.manhattan(a);
        return n > max2 ? n : max2;
    }, 0);
    return m > max ? m : max;
}, 0);

console.log(maxDistance);
