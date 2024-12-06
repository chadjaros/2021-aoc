import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const grid = infile.grid();

    const { start, blocks: originalBlocks } = grid.reduce((acc, v, p) => {
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

    const runScenario = (blocks: Set<string>): { visited: Map<string, Point>; cycle: boolean; } => {
        let dirIdx = 0;
        const visited = new Map<string, Point>();
        let current = start;
        const path = new Set<string>();

        while (grid.isValid(current)) {
            const pathEntry = current.key + '+' + dirIdx;
            if (path.has(pathEntry)) {
                return { visited, cycle: true };
            }
            path.add(pathEntry);
            visited.set(current.key, current);

            while (blocks.has(current.plus(directions[dirIdx]).key)) {
                dirIdx++;
                if (dirIdx === directions.length) {
                    dirIdx = 0;
                }
            }
            current = current.plus(directions[dirIdx]);
        }
        return { visited, cycle: false };
    };

    const first = runScenario(originalBlocks);

    const value = Array.from(first.visited.values()).filter((p) => {
        if (p.key === start.key) {
            return false;
        }
        return runScenario(new Set([...originalBlocks, p.key])).cycle;

    }).length;
    return { value };
});
