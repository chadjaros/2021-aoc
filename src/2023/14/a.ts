import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const grid = infile.grid('', (_) => _);

    grid.forEach((value, point) => {
        if (value === 'O') {
            const upOne = point.minus(new Point(0, 1));
            if (grid.isValid(upOne) && grid.getValue(upOne) === '.') {
                const used = grid.scanDecYFrom(point, (value) => value !== '.')!;
                grid.setValue(point, '.');
                if (used) {
                    grid.setValue(used.plus(new Point(0, 1)), 'O');
                }
                else {
                    grid.setValue(new Point(point.x, 0), 'O');
                }
            }
        }
    });

    let value = 0;
    grid.forEach((char, point) => {
        if (char === 'O') {
            value += grid.height - point.y;
        }
    });
    return { value };
});
