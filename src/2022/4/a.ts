import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

aoc(() => {

    let value = 0;

    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n')
        .map((x) => x.split(',').map((y) => {
            const [start, end] = x.split('-');
            return {start: parseInt(start), end: parseInt(end)};
        }));
        
    for (const line of input) {
        if (line[0].start <= line[1].start && line[0].end >= line[1].end 
            || line[0].start >= line[1].start && line[0].end <= line[1].end) {
            value++;
        }
    }

    return {
        value,
    };
});