import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((_) => parseInt(_));

    const pruneConst = 16777216 - 1;
    const mixAndPrune = (x: number, w: number) => {
        return ((x ^ w) >>> 0) & (pruneConst);
    };

    const next = (x: number) => {
        const x1 = mixAndPrune(x, x << 6);
        const x2 = mixAndPrune(x1, x1 >>> 5);
        return mixAndPrune(x2, x2 << 11);
    };

    const globalCache = new Map<string, number>();

    const nextN = (x: number, n: number) => {
        const localSeen = new Set<string>();

        const result = [
            { value: x, price: x % 10, diff: 0 }
        ];
        for (let i = 1; i <= n; i++) {
            const last = result[result.length - 1];
            const value = next(last.value);
            const price = value % 10;
            const diff = price - last.price;
            result.push({ value, price, diff });

            if (i >= 3) {
                const key = `${result[i - 3].diff},${result[i - 2].diff},${result[i - 1].diff},${result[i].diff}`;
                if (!localSeen.has(key)) {
                    localSeen.add(key);
                    globalCache.set(key, (globalCache.get(key) ?? 0) + price);
                }
            }
        }
        return result;
    };

    input.forEach((_) => nextN(_, 2000));

    const value = [...globalCache.entries()].reduce<[string, number]>((acc, v) => v[1] > acc[1] ? v : acc, ['', 0])[1];
    return { value };
});
