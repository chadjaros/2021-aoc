import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.lines
        .map((x) => x.split(''));

    const scrubLine = (line: string[]): string => {
        const firstHalf = new Set<string>(line.slice(0, line.length / 2));
        const secondHalf = new Set<string>(line.slice(line.length / 2));

        for (const c of firstHalf) {
            if (secondHalf.has(c)) {
                return c;
            }
        }

        throw new Error('no common value found ' + line.length);
    };

    const commons: string[] = [];

    for(const line of input) {    
        commons.push(scrubLine(line));
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