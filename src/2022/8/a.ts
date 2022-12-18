import { aoc } from '../../utils/aoc';

aoc((infile) => {
    let value = 0;

    const input = infile.lines.map((x) => x.split('').map((y) => parseInt(y)));
   
    const width = input[0].length;
    for (let x = 0; x < input[0].length; x++) {
        for (let y = 0; y < input.length; y++) {
            if (x === 0 || y === 0 || x === width - 1 || y === input.length - 1) {
                value++;
                continue;
            }

            const tree = input[y][x];

            let fromleft = true;
            let fromright = true;
            let fromtop = true;
            let frombottom = true;
            for (let inspectX = 0; inspectX < x; inspectX++) {
                if (input[y][inspectX] >= tree) {
                    fromleft = false;
                    break;
                }
            }
            for (let inspectX = x+1; inspectX < width; inspectX++) {
                if (input[y][inspectX] >= tree) {
                    fromright = false;
                    break;
                }
            }
            for (let inspectY = 0; inspectY < y; inspectY++) {
                if (input[inspectY][x] >= tree) {
                    fromtop = false;
                    break;
                }
            }
            for (let inspectY = y+1; inspectY < input.length; inspectY++) {
                if (input[inspectY][x] >= tree) {
                    frombottom = false;
                    break;
                }
            }

            if (fromtop || frombottom || fromleft || fromright) {
                value++;
            }
        }
    }
    
    
    
    return {value};
});