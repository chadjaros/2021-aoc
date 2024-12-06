import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const grid = infile.grid();

    const { start, blocks } = grid.reduce((acc, v, p) => {
        if (v === '#') {
            acc.blocks.add(p.key);
        }
        if (v === '^') {
            acc.start = p;
        }
        return acc;
    }, { start: new Point(0, 0), blocks: new Set<string>() });

    const directions = [
        new Point(0, -1),
        new Point(1, 0),
        new Point(0, 1),
        new Point(-1, 0),
    ];

    let dirIdx = 0;
    const visited = new Set<string>();
    let current = start;

    while (grid.isValid(current)) {
        visited.add(current.key);
        while (blocks.has(current.plus(directions[dirIdx]).key)) {
            dirIdx++;
            if (dirIdx === directions.length) {
                dirIdx = 0;
            }
        }
        current = current.plus(directions[dirIdx]);
    }

    return { value: visited.size };
});
