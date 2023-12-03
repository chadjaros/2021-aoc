import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines
        .map((x) => {
            if (x === '') {
                return null;
            }
            return JSON.parse(x);
        })
        .filter((x) => x !== null);

    const compareLists = (left: any[], right: any[]): number => {
        // console.log(left, ' - ', right, left.length, right.length);
        let i = 0;
        while (i < left.length && i < right.length) {
            if (typeof left[i] === 'number' && typeof right[i] === 'number') {
                if (left[i] > right[i]) {
                    return 1;
                } else if (left[i] < right[i]) {
                    return -1;
                }
            } else if (
                typeof left[i] === 'object' &&
                typeof right[i] === 'object'
            ) {
                const r = compareLists(left[i], right[i]);
                if (r !== 0) {
                    return r;
                }
            } else if (typeof left[i] === 'number') {
                const r = compareLists([left[i]], right[i]);
                if (r !== 0) {
                    return r;
                }
            } else if (typeof right[i] === 'number') {
                const r = compareLists(left[i], [right[i]]);
                if (r !== 0) {
                    return r;
                }
            }
            i++;
        }

        if (left.length < right.length) {
            return -1;
        } else if (left.length > right.length) {
            return 1;
        }

        return 0;
    };

    const div1 = [[2]];
    const div2 = [[6]];

    input.push(div1, div2);

    input.sort(compareLists);

    const idx1 = input.findIndex((x) => x === div1) + 1;
    const idx2 = input.findIndex((x) => x === div2) + 1;

    return { value: idx1 * idx2, idx1, idx2 };
});
