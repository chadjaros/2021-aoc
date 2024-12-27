import { aoc } from '../../ts-utils/aoc';
import { aIncludesAllB, intersection } from '../../ts-utils/set-math';

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

    const globalSeen = new Set<string>();
    const runOption = (set: Set<string>, toCheck: string[], seen: Set<string>): string => {

        const keyArr = [...set];
        keyArr.sort((a, b) => a.localeCompare(b));
        const key = keyArr.join(',');
        if (globalSeen.has(key)) {
            return '';
        }
        globalSeen.add(key);

        const nextOptions = toCheck
            .filter((_) => aIncludesAllB(input.get(_)!, set));

        if (nextOptions.length === 0) {
            const x = [...set];
            x.sort((a, b) => a.localeCompare(b));
            return x.join(',');
        }

        const results = nextOptions.map((_) => {
            const nextSeen = new Set([...seen, ..._]);
            const nextSet = new Set([...set, _]);
            return runOption(nextSet, [...input.get(_)!].filter((x) => !nextSeen.has(x)), nextSeen);
        });
        results.sort((a, b) => b.length - a.length);
        return results[0];
    };

    const investigated = new Set<string>();
    const value = [...input.entries()].reduce((acc, [k, vSet]) => {
        investigated.add(k);
        const biggest = runOption(new Set([k]), [...vSet], investigated);
        return biggest.length > acc.length ? biggest : acc;
    }, '');
    return { value };
});
