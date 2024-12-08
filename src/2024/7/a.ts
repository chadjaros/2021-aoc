import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((l) => {
        const a = l.split(': ');
        const b = a[1].split(' ');
        return {
            total: parseInt(a[0]),
            parts: b.map((_) => parseInt(_))
        };
    });

    const findCombo = (target: number, parts: number[], idx: number, total: number): number => {
        if (idx === parts.length) {
            if (target === total) {
                return total;
            }
            return 0;
        }

        if (total > target) {
            return 0;
        }

        const a = findCombo(target, parts, idx + 1, total * parts[idx]);
        if (a != 0) {
            return a;
        }
        return findCombo(target, parts, idx + 1, total + parts[idx]);
    };

    const value = input.reduce((acc, v) => {
        return acc + findCombo(v.total, v.parts, 1, v.parts[0]);
    }, 0);
    return { value };
});
