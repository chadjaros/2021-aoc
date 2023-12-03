import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { Range } from '../../ts-utils/range';

aoc((infile) => {
    const input = infile
        .regexLines(/x=(-?\d+), y=(-?\d+).+x=(-?\d+), y=(-?\d+)/)
        .map((x) => {
            const sensor = new Point(parseInt(x[0]), parseInt(x[1]));
            const beacon = new Point(parseInt(x[2]), parseInt(x[3]));

            return {
                sensor,
                beacon,
                distance: sensor.manhattanDistance(beacon),
            };
        });

    const compileRanges = (row: number): Range[] => {
        const ranges: Range[] = [];
        for (const l of input) {
            const distance = l.sensor.manhattanDistance(
                new Point(l.sensor.x, row)
            );
            if (distance < l.distance) {
                const overlap = l.distance - distance;
                ranges.push(
                    new Range(l.sensor.x - overlap, l.sensor.x + overlap)
                );
            }
        }
        return ranges;
    };

    const search = (): Point => {
        let x = 0;
        let y = 0;
        for (y = 0; y <= 4000000; y++) {
            const ranges = compileRanges(y);
            for (x = 0; x <= 4000000; x++) {
                const m = ranges.find((r) => r.includes(x));
                if (m) {
                    x = m.end;
                } else {
                    return new Point(x, y);
                }
            }
        }

        throw new Error('failed');
    };

    const point = search();

    return { value: point.x * 4000000 + point.y, point };
});
