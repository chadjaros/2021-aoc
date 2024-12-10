import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.grid('', (x) => parseInt(x));

    const countTrails = (current: Point, value: number): number => {
        if (value === 9) {
            return 1;
        }

        return current.adjacents()
            .filter((_) => input.isValid(_) && input.getValue(_) === value + 1)
            .reduce((acc, _) =>
                acc + countTrails(_, value + 1)
                , 0);
    };

    const value = input.reduce((acc, value, point) => {
        if (value !== 0) {
            return acc;
        }
        return acc + countTrails(point, value);
    }, 0);
    return { value };
});
