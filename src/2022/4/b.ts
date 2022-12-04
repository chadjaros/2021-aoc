import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

aoc(() => {

    let value = 0;

    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n')
        .map((x) => x.split(',').map((y) => y.split('-').map((z) => parseInt(z))));

    for (const line of input) {
        if (line[0][0] >= line[1][0] && line[0][0] <= line[1][1] 
            || line[0][1] >= line[1][0] && line[0][1] <= line[1][1]
            || line[1][0] >= line[0][0] && line[1][0] <= line[0][1]
            || line[1][1] >= line[0][0] && line[1][1] <= line[0][1] ) {
            value++;
        }
    }

    return {
        value,
    };
});