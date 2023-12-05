import { Range } from 'src/ts-utils/range';
import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const lines = infile.lines;
    const seeds = lines[0]
        .split(': ')[1]
        .split(' ')
        .map((_) => parseInt(_));

    const mapRegex = /(\w+)-to-(\w+) map:/;
    const maps = lines.slice(2).reduce(
        (acc, line) => {
            if (line === '') {
                return acc;
            }
            const mapEntry = line.match(mapRegex);
            if (mapEntry) {
                acc.push({
                    from: mapEntry[1],
                    to: mapEntry[2],
                    ranges: [],
                });
                return acc;
            }

            const r = line.split(' ').map((_) => parseInt(_));
            const last = acc[acc.length - 1];
            last.ranges.push({
                srcStart: r[1],
                destStart: r[0],
                len: r[2],
            });
            return acc;
        },
        [] as {
            from: string;
            to: string;
            ranges: { srcStart: number; destStart: number; len: number }[];
        }[]
    );

    const goTo = (values: number[], from: string, end: string): number[] => {
        if (from === end) {
            return values;
        }

        const map = maps.find((_) => _.from === from)!;
        const update = values.map((value) => {
            const range = map.ranges.find(
                (r) => value >= r.srcStart && value < r.srcStart + r.len
            )!;
            if (!range) {
                return value;
            }
            return range.destStart + (value - range.srcStart);
        });
        return goTo(update, map.to, end);
    };

    const result = goTo(seeds, 'seed', 'location');

    return {
        value: result.reduce((acc, v) => Math.min(v, acc), Infinity),
        result,
    };
});
