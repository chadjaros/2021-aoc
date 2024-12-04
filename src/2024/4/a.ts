import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';


const regex = /XMAS/g;
const revRegex = /SAMX/g;

const countMatches = (lines: string[]): number => {

    let value = 0;
    for (const line of lines) {
        value += line.match(regex)?.length ?? 0;
        value += line.match(revRegex)?.length ?? 0;
    }

    return value;
};


aoc((infile) => {
    const lines = infile.lines;

    let value = countMatches(lines);

    const transpose: string[] = [...Series.of(lines[0].length, '')];
    for (let i = 0; i < lines[0].length; i++) {
        for (let j = 0; j < lines.length; j++) {
            transpose[i] += lines[j][i];
        }
    }

    value += countMatches(transpose);

    const diagDown: string[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        let builder = '';
        let idx = 0;
        while (idx < lines.length && i + idx < lines[0].length) {
            builder += lines[idx][i + idx];
            idx++;
        }
        diagDown.push(builder);
    }
    for (let idx = 1; idx < lines.length; idx++) {
        let builder = '';
        let i = 0;
        while (idx + i < lines.length && i < lines[0].length) {
            builder += lines[idx + i][i];
            i++;
        }
        diagDown.push(builder);
    }

    value += countMatches(diagDown);

    const diagUp: string[] = [];
    for (let i = 0; i < lines[0].length; i++) {
        let builder = '';
        let idx = 0;
        while (idx < lines.length && i - idx >= 0) {
            builder += lines[idx][i - idx];
            idx++;
        }
        diagUp.push(builder);
    }
    for (let idx = 1; idx < lines.length; idx++) {
        let builder = '';
        let i = 0;
        while (idx + i < lines.length && lines[0].length - 1 - i >= 0) {
            builder += lines[idx + i][lines[0].length - 1 - i];
            i++;
        }
        diagUp.push(builder);
    }
    value += countMatches(diagUp);

    return { value };
});
