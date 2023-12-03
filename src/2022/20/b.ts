import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const key = 811589153;
    const input = infile// .sample()
        .lines
        .map((x) => ({ val: parseInt(x) * key }));

    const length = input.length;

    const working = [...input];
    console.log(length);

    for (let times = 1; times <= 10; times++) {
        for (const inputval of input) {
            const i = working.indexOf(inputval);
            if (working[i].val === 0) {
                continue;
            }

            const item = working[i];
            const val = working[i].val % (length - 1);
            const move = val + i;
            const target =
                move <= 0
                    ? move + length - 1
                    : move >= length - 1
                        ? move - length + 1
                        : move;

            // console.log(input.map((x) => x.val).join(','));
            // console.log(i, input[i], val, move, target);

            working.splice(i, 1);
            working.splice(target, 0, item);
        }
    }

    // console.log(input.map((x) => x.val).join(','));

    const zeroIdx = working.findIndex((x) => x.val === 0);
    console.log(
        zeroIdx,
        (zeroIdx + 1000) % length,
        (zeroIdx + 2000) % length,
        (zeroIdx + 3000) % length
    );

    const value =
        working[(zeroIdx + 1000) % length].val +
        working[(zeroIdx + 2000) % length].val +
        working[(zeroIdx + 3000) % length].val;
    return { value };
});
