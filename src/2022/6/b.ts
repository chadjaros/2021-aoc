import { aoc } from '../../utils/aoc';

aoc((infile) => {
    let value = 0;

    const input = infile.string.split('');

    const buffer: string[] = [];
    for (let i = 0; i < input.length; i++) {
        value += 1;

        if (buffer.length === 14) {
            buffer.shift();
        }
        
        buffer.push(input[i]);
        if (new Set(buffer).size === 14) {
            break;
        }
    }

    return {
        value,
        signal: buffer.join(''),
    };
}); 