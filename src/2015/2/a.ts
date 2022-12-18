import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((x) => x.split('x').map((n) => parseInt(n)));

    function paperNeeds(box: number[]): {box: number, extra: number} {
        const sides = [...box].sort((a, b) => a - b);
    
        return {
            box: sides[0] * sides[1] * 2 + sides[1] * sides[2] * 2 + sides[0] * sides[2] * 2,
            extra: sides[0] * sides[1]
        };
    }
    
    const answer = input.reduce((accum, b) => {
        const need = paperNeeds(b);
        return accum + need.box + need.extra;
    }, 0);
    
    return {value: answer};
});
