import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((x) => parseInt(x));

    const size = input.reduce((acc, v) => acc + v, 0) / 3;
    let ct = input.length / 3;

    const combinations = (a: number[], set: Set<number>, total: number, target: number): Set<number>[] => {
        if (set.size > ct) {
            return [];
        }
        if (total === target) {
            if (set.size < ct) {
                ct = set.size;
            }
            return [set];
        }
        if (total > target) {
            return [];
        }
        if (a.length === 0) {
            return [];
        }

        const head = a[0];
        const tail = a.slice(1);
        return [true, false].reduce<Set<number>[]>((acc, v) => {
            if (v) {
                const clone = new Set(set).add(head);
                acc.push(...combinations(tail, clone, total + head, target));
            }
            else {
                acc.push(...combinations(tail, set, total, target));
            }
            return acc;
        }, []);
    };

    const result = combinations(input.slice().sort((a, b) => b - a), new Set(), 0, size);

    const withQe = result
        .map((set) => ({set, qe: Array.from(set).reduce((acc, v) => acc * v, 1)}))
        .sort((a, b) => {
            if (a.set.size !== b.set.size) {
                return a.set.size - b.set.size;
            }
            return a.qe - b.qe;
        });

    return {
        value: withQe[0].qe
    };
});