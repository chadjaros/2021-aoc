import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const grid = infile.grid();

    const matches = [
        [['M', '', 'S'], ['', 'A', ''], ['M', '', 'S']],
        [['S', '', 'M'], ['', 'A', ''], ['S', '', 'M']],
        [['M', '', 'M'], ['', 'A', ''], ['S', '', 'S']],
        [['S', '', 'S'], ['', 'A', ''], ['M', '', 'M']]
    ];

    const points = [
        new Point(0, 0),
        new Point(1, 1),
        new Point(0, 2),
        new Point(2, 0),
        new Point(2, 2)
    ];

    const value = grid.reduce((acc, _, point) => {

        let match = false;
        if (point.x < grid.width - 2 && point.y < grid.height - 2) {
            match = matches.some((match) =>
                points.every((p) =>
                    match[p.x][p.y] === grid.getValue(point.plus(p))
                )
            );
        }
        return acc + (match ? 1 : 0);
    }, 0);
    return { value };
});
