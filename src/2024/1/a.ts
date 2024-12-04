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

    const value = lists.a.reduce((acc, _, idx) =>
        acc + Math.abs(lists.a[idx] - lists.b[idx])
        , 0);

    return { value };
});
