import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines[0].split(' ').map((_) => parseInt(_));

    let uniqueValues = input.reduce((acc, _) => {
        if (!acc.has(_)) {
            acc.set(_, 0);
        }
        acc.set(_, acc.get(_)! + 1);
        return acc;
    }, new Map<number, number>());

    for (let time = 0; time < 75; time++) {

        uniqueValues = [...uniqueValues.entries()].reduce((acc, [_, count]) => {
            const digits = _.toString();
            let vals: number[] = [];
            if (_ === 0) {
                vals = [1];
            }
            else if (digits.length % 2 === 0) {
                const halfway = digits.length / 2;
                vals = [parseInt(digits.slice(0, halfway)), parseInt(digits.slice(halfway))];
            }
            else {
                vals = [_ * 2024];
            }
            vals.forEach((val) => {
                if (!acc.has(val)) {
                    acc.set(val, 0);
                }
                acc.set(val, acc.get(val)! + count);
            });
            return acc;
        }, new Map<number, number>());
    }

    const value = [...uniqueValues.values()].reduce((acc, _) => acc + _, 0);
    return { value };
});