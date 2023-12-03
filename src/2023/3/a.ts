import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

aoc((infile) => {

    const digits = new Set([...Series.range(0, 9)].map((n) => `${n}`));
    const noSymbol = new Set([...digits, '.']);

    const lines = infile.lines;

    const checkBorder = (xStart: number, yStart: number, length: number): boolean => {
        for (let y = yStart; y <= yStart + 2; y++) {
            if (y >= 0 && y < lines.length) {
                for (let x = xStart; x < xStart + length + 2; x++) {
                    if (x >= 0 && x < lines[y].length) {
                        if (!noSymbol.has(lines[y][x])) {
                            return true;

                        }
                    }
                }
            }
        }
        return false;
    };

    let value = 0;
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

                if (checkBorder(iStart - 1, l - 1, numStr.length)) {
                    value += parseInt(numStr);
                }

            }
        }
    }

    return { value };
});
