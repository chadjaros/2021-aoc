import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

aoc(() => {
    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n')
        .map((x) => x === '' ? undefined : parseInt(x));

    let highest = 0;
    let total = 0;
    for(let i = 0; i < input.length; i++) {
    

        if (input[i] === undefined) {
            if (total > highest) {
                highest = total;
            }
            total = 0;
        }
        else {
            total += input[i]!;
        }
    }

    return {value: highest};
});