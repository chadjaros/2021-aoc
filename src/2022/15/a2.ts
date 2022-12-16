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

    const row = 2000000;
    const ranges: Range[] = [];
    for (const l of input) {
        const distance = l.sensor.manhattanDistance(new Point(l.sensor.x, row));
        if (distance < l.distance) {
            const overlap =  l.distance - distance;
            ranges.push(new Range(l.sensor.x - overlap, l.sensor.x + overlap));
        }
    }

    const merges: Range[] = [...ranges];
    let end = false;
    while (!end) {
        let m1 = -1;
        let m2 = -1;
        for (m1 = 0; m1 < merges.length - 1; m1++) {
            const m = merges[m1];
            for (let ri = m1 + 1; ri < merges.length; ri++) {
                const r = merges[ri];
                if (r.overlaps(m)) {
                    m2 = ri;
                    break;
                }
            }
            if (m2 >= 0) {
                merges[m1] = m.merge(merges[m2]);
                merges.splice(m2, 1);
                break;
            }
        }
        if (m2 < 0) {
            end = true;
        }   
    }
    
    const beacons = new Map<string, Point>(input.filter((i) => i.beacon.y === row).map((i) => [i.beacon.key, i.beacon]));

    let value = merges.reduce((acc, v) => acc + v.length, 0);

    Array.from(beacons.values()).forEach((b) => {
        if (merges.some((r) => r.overlaps(new Range(b.x, b.x)))) {
            value--;
        }
    });

    return { value: value };
});