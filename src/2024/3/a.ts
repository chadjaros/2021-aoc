import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    let value = 0;

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    const matches = infile.lines.join().matchAll(regex);

    for (const next of matches) {
        value += parseInt(next[1]) * parseInt(next[2]);
    }
    return { value };
});
