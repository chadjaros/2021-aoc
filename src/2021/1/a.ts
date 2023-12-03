import { aoc } from '../../ts-utils/aoc';
import { input1 } from './input';

aoc(() => {
    let value = 0;
    for (let i = 1; i < input1.length; i++) {
        if (input1[i] > input1[i - 1]) {
            value++;
        }
    }

    return { value };
});
