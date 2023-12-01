import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const value = infile.lines
        .map((value) => {
            return Array.from(value).filter((v) => v.match(/\d/));
        })
        .map(value => {
            return parseInt(value[0] + value[value.length - 1]);
        })
        .reduce((acc, it) => {
            return acc + it;
        }, 0);

    return { value };
});