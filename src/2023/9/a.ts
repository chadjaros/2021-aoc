import { aoc } from '../../ts-utils/aoc';

function derive(process: number[], acc: number[][]): number[][] {
    if (process.every((x) => x === 0)) {
        return acc;
    }
    const next: number[] = [];
    for (let i = 1; i < process.length; i++) {
        next.push(process[i] - process[i - 1]);
    }
    acc.push(next);
    return derive(next, acc);
}

function last<T>(arr: T[]): T {
    return arr[arr.length - 1];
}

aoc((infile) => {
    const value = infile.lines
        .map((l) => {
            const nums = l.split(' ').map((_) => parseInt(_));
            const derives = derive(nums, [nums]);
            for (let i = derives.length - 2; i >= 0; i--) {
                derives[i].push(last(derives[i]) + last(derives[i + 1]));
            }
            return last(derives[0]);
        })
        .reduce((acc, v) => acc + v, 0);

    return { value };
});
