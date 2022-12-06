import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

aoc(() => {
    let value = '';
    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n');


    const stacks: string[][] = [];
    for (let i = 0; i < 9; i++) {
        stacks.push([]);
    }
    for (const line of input.slice(0, 8)) {
        for (let i = 0; i < 9; i++) {
            if (line[1 + i*4] != ' ') {
                stacks[i].unshift(line[1 + i*4]);
            }
        }
    }
    
    const instructions = input.slice(10).map((x) => {
        const splits = x.split(' ');
        return {
            ct: parseInt(splits[1]), 
            from: parseInt(splits[3]), 
            to: parseInt(splits[5])
        };
    });

    for (let i = 0; i < 9; i++) {
        console.log(i+1, stacks[i].join(''));
    }
    
    for (const ins of instructions) {

        const move = stacks[ins.from - 1].splice(-ins.ct);
        stacks[ins.to - 1].push(...move);
    }

    for (let i = 0; i < 9; i++) {
        value += stacks[i][stacks[i].length - 1];
    }
    return {
        value
    };
});