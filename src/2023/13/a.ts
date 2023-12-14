import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { rotationMatrices } from '../../2021/19/input';
import { ArrayUtils } from '../../ts-utils/array-utils';

const checkMirror = (array: string[], topIdx: number, botIdx: number): boolean => {
    if (topIdx < 0 || botIdx >= array.length) {
        return true;
    }
    if (array[topIdx] !== array[botIdx]) {
        return false;
    }
    return checkMirror(array, topIdx - 1, botIdx + 1);
};

const findMirrorIndex = (array: string[]): number | undefined => {
    for (let i = 1; i < array.length; i++) {
        if (checkMirror(array, i - 1, i)) {
            return i;
        }
    }
};

aoc((infile) => {
    const value = infile.lines
        .reduce((acc, line) => {
            if (acc.length === 0 || line.length === 0) {
                acc.push([]);
            }
            if (line.length > 0) {
                acc[acc.length - 1].push(line);
            }
            return acc;
        }, [] as string[][])
        .map((grid) => {
            let value = 100 * (findMirrorIndex(grid) ?? 0);
            if (value === 0) {
                const transposed = ArrayUtils.transpose(grid.map((_) => _.split(''))).map((_) => _.join(''));
                value = findMirrorIndex(transposed) ?? -Infinity;
            }
            return value;
        })
        .reduce((acc, v) => acc + (v ?? 0), 0);

    return { value };
});
