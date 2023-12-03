import { input17, model } from './input';

const input = input17;

let sum = 0;
let iterations = 0;
console.log(input, sum <= input.max.x && sum >= input.min.x);

for (
    let x = 1;
    sum > input.max.x || sum < input.min.x || iterations > 1000;
    x++
) {
    sum += x;
    iterations++;
}

let maxY = 0;

console.log(sum, iterations);

for (let y = 1000; y >= 0; y--) {
    const result = model(input, iterations, y);
    if (result.hit) {
        maxY = y;
        break;
    }
}

const velocities: number[][] = [];
for (let dY = input.max.y; dY <= maxY; dY++) {
    for (let dX = iterations; dX <= input.max.x; dX++) {
        const result = model(input, dX, dY);
        if (result.hit) {
            velocities.push([dX, dY]);
        }
    }
}

console.log(velocities.length);
