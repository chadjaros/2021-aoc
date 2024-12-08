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

                const an1 = a.plus(diff);
                if (input.isValid(an1)) {
                    antinodes.add(an1.key);
                }
                const an2 = b.minus(diff);
                if (input.isValid(an2)) {
                    antinodes.add(an2.key);
                }
            }
        }
    });

    return { value: antinodes.size };
});
