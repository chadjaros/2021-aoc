import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.lines
        .map((x) => x.split(''));

    const scrubLines = (startIdx: number, lines: string[][]): string => {
        const map = new Map<string, number>();

        for (let l = startIdx; l < startIdx + 3; l++) {
            const s = new Set(lines[l]);
            for (const c of s) {
                map.set(c, (map.get(c) ?? 0) + 1);
            }
        }
        
        for (const [k, v] of map) {
            if (v === 3) {
                return k;
            }
        }

        throw new Error('no common value found');
    };

    const commons: string[] = [];

    for(let idx = 0; idx < input.length; idx+= 3) {    
        commons.push(scrubLines(idx, input));
    }

    let value = 0;
    for (const c of commons) {
        if (c.charCodeAt(0) >= 97) {
            value += c.charCodeAt(0) - 96;
        }
        else {
            value += c.charCodeAt(0) - 38;
        }
    }

    return {
        value,
    };
});