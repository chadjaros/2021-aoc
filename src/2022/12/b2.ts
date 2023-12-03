import { aoc } from '../../ts-utils/aoc';
import { aStar } from '../../ts-utils/find-path';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.splitLines('');

    let dest: Point = new Point(0, 0);

    const g = input.map((row, y) => {
        return row.map((v, x) => {
            if (v === 'S') {
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
    const endNode = grid.nodeAt(dest);

    const aVal = 'a'.charCodeAt(0);

    let value = Infinity;
    grid.forEach((v, start) => {
        if (v === aVal) {
            const startNode = grid.nodeAt(start);

            const result = aStar(
                startNode,
                endNode,
                (n) => endNode.point.manhattanDistance(n.point),
                grid
            );
            const cost = result?.cost ?? Infinity;
            if (cost > 0 && cost < value) {
                value = cost;
            }
        }
    });

    return { value };
});
