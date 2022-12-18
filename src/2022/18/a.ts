import { aoc } from '../../utils/aoc';
import { Point3 } from '../../utils/point-3d';

aoc((infile) => {

    const input = infile
        // .sample()
        .splitLinesAndMap(',', (x) => parseInt(x))
        .map((x) => new Point3(x));

    const allSet = new Set(input.map((x) => x.key));

    const value = input.reduce((acc, v) => {
        return acc + v.adjacents(false).filter((x) => !allSet.has(x.key)).length;
    }, 0);
    return {
        value
    };
});