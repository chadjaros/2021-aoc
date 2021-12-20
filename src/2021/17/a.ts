import { posix } from 'path';
import { Point } from '../../utils/point-2d';
import { input17, model } from './input';

const input = input17;


let sum = 0;
let iterations = 0;
console.log(input,sum <= input.max.x && sum >= input.min.x );

for (let x = 1; sum > input.max.x || sum < input.min.x || iterations > 1000; x++) {
    sum += x;
    iterations++;
}

console.log(sum, iterations);

for (let y = 1000; y >= 0; y--) {
    const result = model(input, iterations, y);
    if (result.hit) {
        console.log(result, y);
        break;
    }
}

console.log('failed');
