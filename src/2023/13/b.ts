import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { rotationMatrices } from '../../2021/19/input';
import { transpose } from '../../ts-utils/array-rotate';

const checkMirror = (array: string[], topIdx: number, botIdx: number): boolean => {
    if (topIdx < 0 || botIdx >= array.length) {
        return true;
    }
    if (array[topIdx] !== array[botIdx]) {
        return false;
    }
    return checkMirror(array, topIdx - 1, botIdx + 1);
};

const findMirrorIndex = (array: string[], skipIdx?: number): number | undefined => {
    for (let i = 1; i < array.length; i++) {
        if (skipIdx !== undefined && i === skipIdx) {
            continue;
        }
        if (checkMirror(array, i - 1, i)) {
            return i;
        }
    }
};

const calculateGrid = (grid: string[], prevValue?: number): number => {
    const prevHValue = prevValue === undefined || prevValue < 100 ? undefined : prevValue / 100;
    let value = 100 * (findMirrorIndex(grid, prevHValue) ?? 0);
    if (value === 0) {
        const prevVValue = prevValue === undefined || prevValue >= 100 ? undefined : prevValue;
        const transposed = transpose(grid.map((_) => _.split(''))).map((_) => _.join(''));
        value = findMirrorIndex(transposed, prevVValue) ?? 0;
    }
    return value;
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
            const origValue = calculateGrid(grid);

            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    const copy = [...grid];
                    const charat = grid[y][x];
                    const repl = charat === '#' ? '.' : '#';
                    copy[y] = grid[y].slice(0, x) + repl + grid[y].slice(x + 1);

                    const value = calculateGrid(copy, origValue);
                    if (value > 0) {
                        if (origValue !== value) {
                            return value;
                        }
                    }
                }
            }
            throw new Error('fail');
        })
        .reduce((acc, v) => acc + (v ?? 0), 0);

    return { value };
});
