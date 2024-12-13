import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { findFill } from '../../ts-utils/simple-fill';

aoc((infile) => {
    const input = infile.grid();

    const visited = new Set<string>();

    const value = input.reduce((acc, _, point) => {
        if (visited.has(point.key)) {
            return acc;
        }

        const group = findFill(input, point, (v) => v === _);
        group.forEach((p) => visited.add(p.key));
        const perim = [...group.values()].reduce((acc, _) => {
            return acc + (4 - _.adjacents().filter((p) => group.has(p.key)).length);
        }, 0);

        return acc + group.size * perim;
    }, 0);

    return { value };
});
