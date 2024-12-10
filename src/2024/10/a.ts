import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.grid('', (x) => parseInt(x));

    const countTrailheads = (result: Set<string>, current: Point, value: number): Set<string> => {
        if (value === 9) {
            result.add(current.key);
            return result;
        }

        current.adjacents()
            .filter((_) => input.isValid(_) && input.getValue(_) === value + 1)
            .forEach((_) => {
                countTrailheads(result, _, value + 1);
            });

        return result;
    };

    const value = input.reduce((acc, value, point) => {
        if (value !== 0) {
            return acc;
        }
        return acc + countTrailheads(new Set(), point, value).size;
    }, 0);
    return { value };
});
