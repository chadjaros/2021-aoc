import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.lines
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