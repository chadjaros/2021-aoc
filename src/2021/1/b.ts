import { aoc } from '../../ts-utils/aoc';
import { input1 } from './input';

aoc(() => {
    let prev = input1[0] + input1[1] + input1[2];
    let current = 0;
    let count = 0;
    for (let i = 3; i < input1.length; i++) {
        current = input1[i] + input1[i - 1] + input1[i - 2];
        if (current > prev) {
            count++;
        }
        prev = current;
    }

    return { value: count };
});
