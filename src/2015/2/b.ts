import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.lines.map((x) => x.split('x').map((n) => parseInt(n)));

    function ribbonNeeds(box: number[]): {box: number, bow: number} {
        const sides = [...box].sort((a, b) => a - b);

        return {
            box: sides[0] * 2 + sides[1] * 2,
            bow: sides[0] * sides[1] * sides[2]
        };
    }

    const answer = input.reduce((accum, b) => {
        const need = ribbonNeeds(b);
        return accum + need.box + need.bow;
    }, 0);

    return {value: answer};
});