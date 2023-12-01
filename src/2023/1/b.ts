import { aoc } from '../../utils/aoc';

const digits = [
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
];

aoc((infile) => {

    const first = (value: string): string => {
        for (let i = 0; i < value.length; i++) {
            const sub = value.substring(i);
            for (const digit of digits) {
                if (sub.startsWith(digit[0])) {
                    return digit[1];
                }
            }
        }

        throw new Error();
    };

    const last = (value: string): string => {
        for (let i = value.length - 1; i >= 0; i--) {
            const sub = value.substring(i);
            for (const digit of digits) {
                if (sub.startsWith(digit[0])) {
                    return digit[1];
                }
            }
        }

        throw new Error();
    };

    const value = infile.lines
        .map((value) => {
            const result = parseInt(first(value) + last(value));
            return result;
        })
        .reduce((acc, it) => {
            return acc + it;
        }, 0);

    return { value };
});