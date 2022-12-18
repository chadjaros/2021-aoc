import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.string.split('');
    let sum = 0;
    for (let x = 0; x < input.length; x++) {
        sum += input[x] === ')' ? -1 : 1;
        if (sum === -1) {
            return { value: x + 1};
        }
    }

    return {value: -1};
});
