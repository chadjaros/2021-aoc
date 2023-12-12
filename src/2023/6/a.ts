import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

aoc((infile) => {
    const nums = infile.lines.map((x) => {
        return x
            .split(/\:\s+/)[1]
            .split(/\s+/)
            .map((y) => parseInt(y));
    });

    const races: { time: number; record: number }[] = [];
    for (let i = 0; i < nums[0].length; i++) {
        races.push({ time: nums[0][i], record: nums[1][i] });
    }

    const getDist = (charge: number, total: number): number => {
        return charge * (total - charge);
    };

    const winners = (race: { time: number; record: number }): number => {
        return [...Series.range(0, race.time)].filter((x) => getDist(x, race.time) > race.record).length;
    };

    const value = races.reduce((acc, race) => {
        return acc * winners(race);
    }, 1);

    return { value };
});
