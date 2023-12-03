import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const value = infile.string.split('').reduce((sum, val) => {
        return (val === ')' ? -1 : 1) + sum;
    }, 0);

    return { value };
});
