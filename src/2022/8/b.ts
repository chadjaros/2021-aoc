import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    let value = 0;

    const input = infile.splitLinesAndMap('', (x) => parseInt(x));

    const width = input[0].length;
    for (let x = 0; x < input[0].length; x++) {
        for (let y = 0; y < input.length; y++) {
            if (
                x === 0 ||
                y === 0 ||
                x === width - 1 ||
                y === input.length - 1
            ) {
                continue;
            }

            const tree = input[y][x];

            let fromleft = 0;
            let fromright = 0;
            let fromtop = 0;
            let frombottom = 0;
            for (let inspectX = x - 1; inspectX >= 0; inspectX--) {
                fromleft++;
                if (input[y][inspectX] >= tree) {
                    break;
                }
            }
            for (let inspectX = x + 1; inspectX < width; inspectX++) {
                fromright++;
                if (input[y][inspectX] >= tree) {
                    break;
                }
            }
            for (let inspectY = y - 1; inspectY >= 0; inspectY--) {
                fromtop++;
                if (input[inspectY][x] >= tree) {
                    break;
                }
            }
            for (let inspectY = y + 1; inspectY < input.length; inspectY++) {
                frombottom++;
                if (input[inspectY][x] >= tree) {
                    break;
                }
            }

            const dist = fromtop * frombottom * fromleft * fromright;
            if (dist > value) {
                value = dist;
            }
        }
    }

    return { value };
});
