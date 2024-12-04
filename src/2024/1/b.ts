import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const lists = infile.lines.reduce((acc, _) => {
        const nums = _.split('   ').map((_2) => parseInt(_2));
        acc.a.push(nums[0]);
        acc.b.push(nums[1]);
        return acc;
    }, { a: [], b: [] } as { a: number[]; b: number[]; });

    lists.a.sort((a, b) => a - b);
    lists.b.sort((a, b) => a - b);

    let bIdx = 0;
    let aIdx = 0;
    let value = 0;
    while (aIdx < lists.a.length) {
        let ct = 0;
        while (lists.a[aIdx] >= lists.b[bIdx] && bIdx < lists.b.length) {
            if (lists.a[aIdx] === lists.b[bIdx]) {
                ct++;
            }
            bIdx++;
        }

        const add = lists.a[aIdx] * ct;
        value += add;

        while (lists.a[aIdx] === lists.a[aIdx + 1]) {
            aIdx += 1;
            value += add;
        }

        aIdx += 1;
    }

    return { value };
});
