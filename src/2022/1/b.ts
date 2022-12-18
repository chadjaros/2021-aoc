import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.lines
        .map((x) => x === '' ? undefined : parseInt(x));

    const highest = [0, 0, 0];
    let total = 0;
    for(let i = 0; i < input.length; i++) {
    

        if (input[i] === undefined) {
            if (total > highest[2]) {
                highest[2] = total;
                highest.sort((a, b) => b - a);
                console.log(highest);
            }
            total = 0;
        }
        else {
            total += input[i]!;
        }
    }

    return {value: highest.reduce((acc, x) => acc + x, 0)};
});