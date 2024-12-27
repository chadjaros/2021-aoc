import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines.reduce((acc, x) => {
        const [left, right] = x.split('-');
        if (!acc.has(left)) {
            acc.set(left, new Set());
        }
        acc.get(left)?.add(right);
        if (!acc.has(right)) {
            acc.set(right, new Set());
        }
        acc.get(right)?.add(left);
        return acc;
    }, new Map<string, Set<string>>());

    const value = [...input.entries()].reduce((acc, [k, vSet]) => {
        if (k[0] !== 't') {
            return acc;
        }

        const v = [...vSet];
        for (let i = 0; i < v.length; i++) {
            for (let j = i + 1; j < v.length; j++) {
                if (input.get(v[i])?.has(v[j])) {
                    const list = [k, v[i], v[j]];
                    list.sort((a, b) => a.localeCompare(b));
                    acc.add(list.join(','));
                    console.log(list.join(','));
                }
            }
        }
        return acc;
    }, new Set<string>()).size;
    return { value };
});
