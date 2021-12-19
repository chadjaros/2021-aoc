import { input18 } from './input';

const input = input18;

let max = 0;

for(const a of input) {
    for(const b of input) {
        if (a !== b) {
            const sum = a.plus(b).magnitude;
            if (sum > max) {
                max = sum;
            }
        }
    }
}

console.log(max);