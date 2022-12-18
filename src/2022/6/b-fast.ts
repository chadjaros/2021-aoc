import { aoc } from '../../utils/aoc';

aoc((infile) => {
    let value = -1;
    const bufferSize = 14;
    const input = infile.string.split('');

    const counts = new Map<string, number>();
    const dupes = new Set<string>();
    while (dupes.size != 0 || value < bufferSize) {
        value += 1;

        const char = input[value];
        if (!counts.has(char)) {
            counts.set(char, 0);
        }

        const newVal = counts.get(char)! + 1;
        if (newVal === 2) {
            dupes.add(char);
        }
        counts.set(char, newVal);
        if (value >= bufferSize) {
            const delChar = input[value - bufferSize];
            const delVal = counts.get(delChar)! - 1;
            if (delVal === 1) {
                dupes.delete(delChar);
            }
            counts.set(delChar, delVal);
        }
    }

    // shift from array index to char position
    value++;

    return {
        value,
        signal: input.slice(value - bufferSize, value).join(''),
    };
});
