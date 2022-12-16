import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';
import { Range } from '../../utils/range';

aoc((infile) => {
    const input = infile.regexLines(/x=(-?\d+), y=(-?\d+).+x=(-?\d+), y=(-?\d+)/)
        .map((x) => {
            const sensor = new Point(parseInt(x[0]), parseInt(x[1]));
            const beacon = new Point(parseInt(x[2]), parseInt(x[3]));

            return {
                sensor,
                beacon,
                distance: sensor.manhattanDistance(beacon)
            };
        });

    const compileRanges = (row: number): Range[] => {
        const ranges: Range[] = [];
        for (const l of input) {
            const distance = l.sensor.manhattanDistance(new Point(l.sensor.x, row));
            if (distance < l.distance) {
                const overlap =  l.distance - distance;
                ranges.push(new Range(l.sensor.x - overlap, l.sensor.x + overlap));
            }
        }
        return ranges;
    };
    
    const search = (): Point => {
        let y = 0;
        let merges: Range[] = [];
        for(y = 0; y <= 4000000; y++) {
            merges = Range.mergeList(compileRanges(y));
            if (merges.length > 1) {
                break;
            }
        }

        if (merges.length <= 1) {
            throw new Error('failed');
        }
        return new Point(merges.reduce((acc, v) => v.end < acc ? v.end : acc, Infinity) + 1, y);
    };

    const point = search();

    return { value: point.x * 4000000 + point.y, point };
});