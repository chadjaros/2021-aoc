import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.grid();
    const antennas = new Map<string, Point[]>();
    input.forEach((value, point) => {
        if (value !== '.') {
            if (!antennas.has(value)) {
                antennas.set(value, []);
            }
            antennas.get(value)!.push(point);
        }
    });

    const antinodes = new Set<string>();

    antennas.forEach((points, k) => {
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const a = points[i];
                const b = points[j];
                const diff = a.minus(b);

                let down = a;
                while (input.isValid(down)) {
                    antinodes.add(down.key);
                    down = down.plus(diff);
                }
                let up = b;
                while (input.isValid(up)) {
                    antinodes.add(up.key);
                    up = up.minus(diff);
                }
            }
        }
    });

    return { value: antinodes.size };
});
