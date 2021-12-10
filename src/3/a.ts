import { input3 } from './input';

function calculateBinary(number: number[]): number {
    let sum = 0;
    for (let x = 0; x < number.length; x++) {
        if (number[number.length - 1 - x]) {
            sum += Math.pow(2, x)
        }
    }
    return sum;
}

function main() {
    const gamma: number[] = [];
    const epsilon: number[] = [];

    for (let i = 0; i < input3[0].length; i++) {
        let zeroes = 0;
        let ones = 0;
        for (const number of input3) {
            if (number[i] === 0) {
                zeroes++;
            }
            else {
                ones++;
            }
        }

        if (zeroes > ones) {
            gamma.push(0);
            epsilon.push(1);
        }
        else {
            gamma.push(1);
            epsilon.push(0);
        }
    }

    console.log('gamma', gamma, calculateBinary(gamma), 'epsilon', epsilon, calculateBinary(epsilon));
    console.log(calculateBinary(gamma) * calculateBinary(epsilon));
}

main();
