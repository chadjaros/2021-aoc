import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((_) => parseInt(_));

    const mixAndPrune = (x: number, w: number) => {
        return ((x ^ w) >>> 0) & (16777216 - 1);
    };

    const next = (x: number) => {
        const x1 = mixAndPrune(x, x << 6);
        const x2 = mixAndPrune(x1, x1 >>> 5);
        return mixAndPrune(x2, x2 << 11);
    };

    const nextN = (x: number, n: number) => {
        let v = x;
        for (let i = 0; i < n; i++) {
            v = next(v);
        }
        return v;
    };

    const value = input.reduce((acc, _) => acc + nextN(_, 2000), 0);
    return { value };
});
