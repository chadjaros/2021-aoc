import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

aoc((infile) => {
    const nums = infile.lines.map((x) => {
        return parseInt(x.split(/\:\s+/)[1].split(/\s+/).join(''));
    });

    const race = { time: nums[0], record: nums[1] };

    const quadFormula = (a: number, b: number, c: number): number[] => {
        const d = b * b - 4 * a * c;
        if (d < 0) {
            return [];
        }
        const x1 = (-b + Math.sqrt(d)) / (2 * a);
        const x2 = (-b - Math.sqrt(d)) / (2 * a);
        return [x1, x2];
    };

    const factors = quadFormula(-1, race.time, -1 * race.record);

    return {
        value:
            Math.floor(Math.max(...factors)) -
            Math.ceil(Math.min(...factors)) +
            1,
    };
});
