import { aoc } from '../../ts-utils/aoc';
import { aStar } from '../../ts-utils/find-path';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.splitLines('');

    let start: Point = new Point(0, 0);
    let dest: Point = new Point(0, 0);

    const g = input.map((row, y) => {
        return row.map((v, x) => {
            if (v === 'S') {
                start = new Point(x, y);
                return 'a'.charCodeAt(0);
            } else if (v === 'E') {
                dest = new Point(x, y);
                return 'z'.charCodeAt(0);
            }
            return v.charCodeAt(0);
        });
    });

    const grid = new Grid(g, (p, grid) => {
        const v = grid.getValue(p);
        return grid
            .adjacentTo(p, false)
            .filter((a) => grid.getValue(a) <= v + 1)
            .map((a) => {
                return {
                    nodeId: a.key,
                    weight: 1,
                };
            });
    });
    const startNode = grid.nodeAt(start);
    const endNode = grid.nodeAt(dest);

    const result = aStar(
        startNode,
        endNode,
        (n) => endNode.point.manhattanDistance(n.point),
        grid
    );

    return { value: result?.cost ?? -2 };
});
