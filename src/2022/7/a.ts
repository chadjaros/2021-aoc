import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';
import { compileSize, Directory, runInstructions } from './model';

aoc(() => {
    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n').filter((x) => x != '');
   
    const root = runInstructions(input);

    compileSize(root);

    const addUp = (dir: Directory): number => {
        return Array.from(dir.directories.values()).reduce((acc, v) => acc + addUp(v), 0)
         + (dir.totalSize <= 100000 ? dir.totalSize : 0);
    };
    
    return {value: addUp(root)};
});