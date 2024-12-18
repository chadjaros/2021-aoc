import { aoc } from '../../ts-utils/aoc';
import { dijkstra } from '../../ts-utils/find-path';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.lines.map((_) => _.split(',')).map((_) => new Point(parseInt(_[0]), parseInt(_[1])));

    const grid = Grid.fromSize(71, 71, '.' as string, (p, g) => {
        return p.adjacents().filter((_) => g.isValid(_) && g.getValue(_) !== '#').map((_) => ({ nodeId: _.key, weight: 1 }));
    });

    const end = grid.nodeAt(new Point(70, 70));

    input.slice(0, 1024).forEach((_) => grid.setValue(_, '#'));

    grid.print();

    const result = dijkstra(grid.nodeAt(new Point(0, 0)), grid, (n) => n.id === end.id);
    const value = result!.costToTarget!;
    return { value };
});
