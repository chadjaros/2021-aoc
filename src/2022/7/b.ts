import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';
import { compileSize, Directory, runInstructions } from './model';

aoc(() => {

    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n').filter((x) => x != '');
   
    const root = runInstructions(input);

    compileSize(root);
    
    const totalDisk = 70000000;
    const currentSpace = totalDisk - root.totalSize;
    const targetSpace = 30000000;

    const findWinner = (current: Directory, winner: Directory): Directory => {
        const estimate = currentSpace + current.totalSize;
        if (estimate >= targetSpace && estimate < winner.totalSize + currentSpace) {
            winner = current;
        }
        for (const d of current.directories.values()) {
            winner = findWinner(d, winner);
        }
        return winner;
    };
    
    const target = findWinner(root, root);

    return {value: target.totalSize, totalDisk, used: root.totalSize, currentSpace};
});