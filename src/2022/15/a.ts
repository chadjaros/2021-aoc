import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

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

    const points = new Set<string>();
    const row = 2000000;
    for (const l of input) {
        const distance = l.sensor.manhattanDistance(new Point(l.sensor.x, row));
        if (distance < l.distance) {
            const overlap = l.distance - distance;
            for (let x = l.sensor.x - overlap; x <= l.sensor.x + overlap; x++) {
                points.add(new Point(x, row).key);
            }
        }
    }

    for (const l of input) {
        points.delete(l.beacon.key);
    }

    return { value: points.size };
});
