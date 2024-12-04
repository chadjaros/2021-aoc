import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    let value = 0;

    const regex = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

    const matches = infile.lines.join().matchAll(regex);

    let on = true;
    for (const next of matches) {
        if (next[0] === 'do()') {
            on = true;
        }
        else if (next[0] === "don't()") {
            on = false;
        }
        else if (on && next[0].startsWith('mul')) {
            value += parseInt(next[2]) * parseInt(next[3]);
        }
    }
    return { value };
});
