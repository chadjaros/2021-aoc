import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

aoc((infile) => {

    const digits = new Set([...Series.range(0, 9)].map((n) => `${n}`));
    const gear = '*';

    const lines = infile.lines;

    const gears = new Map<string, number[]>();
    const detectGears = (xStart: number, yStart: number, length: number, num: number): boolean => {
        for (let y = yStart; y <= yStart + 2; y++) {
            if (y >= 0 && y < lines.length) {
                for (let x = xStart; x < xStart + length + 2; x++) {
                    if (x >= 0 && x < lines[y].length) {
                        if (lines[y][x] === gear) {
                            const gearPos = `${x},${y}`;
                            if (!gears.has(gearPos)) {
                                gears.set(gearPos, []);
                            }
                            gears.get(gearPos)?.push(num);
                        }
                    }
                }
            }
        }
        return false;
    };

    for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        for (let i = 0; i < line.length; i++) {
            if (digits.has(line[i])) {
                let numStr = '';
                const iStart = i;
                do {
                    numStr += line[i];
                    i++;
                } while (i < line.length && digits.has(line[i]));

                detectGears(iStart - 1, l - 1, numStr.length, parseInt(numStr));
            }
        }
    }

    const value = [...gears.entries()].reduce((acc, v) => {
        if (v[1].length === 2) {
            return acc + (v[1][0] * v[1][1]);
        }

        return acc;
    }, 0);

    return { value };
});
