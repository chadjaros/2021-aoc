import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    let input = infile.lines[0].split(' ').map((_) => parseInt(_));

    for (let time = 0; time < 25; time++) {
        input = input.flatMap((_) => {
            const digits = _.toString();
            if (_ === 0) {
                return 1;
            }
            if (digits.length % 2 === 0) {
                const halfway = digits.length / 2;
                return [parseInt(digits.slice(0, halfway)), parseInt(digits.slice(halfway))];
            }
            return _ * 2024;
        });
    }

    const value = input.length;
    return { value };
});
