import { input7 } from './input';

function cost(value: number, target: number): number {
    const distance = Math.abs(target - value);
    let sum = 0;
    for (let i = 1; i <= distance; i++) {
        sum+=i;
    }
    return sum;
}

function main() {

    let max = -1;
    let min = 2000000;
    let sum = 0;
    for (const value of input7) {
        if (value > max) {
            max = value;
        }
        if (value < min) {
            min = value;
        }
        sum += value;
    }
    const avg = sum / input7.length;

    let minSum = 2000000000;
    let index = -1;
    for (let i = min; i <= max; i++) {
        let sum = 0;
        for (const value of input7) {
            sum += cost(value, i);
        }
        if (sum < minSum) {
            minSum = sum;
            index = i;
        }
    }

    console.log('average', avg, 'index', index, minSum);
}

main();
