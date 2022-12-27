import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile
        // .sample()
        .lines.map((x) => ({ val: parseInt(x), moved: false}));

    let i = 0;
    const length = input.length;

    console.log(length);

    while (i < length) {

        if (input[i].moved) {
            i++;
            continue;
        }
        if (input[i].val === 0) {
            input[i].moved = true;
            i++;
            continue;
        }

        const item = input[i];
        input[i].moved = true;
        const val = input[i].val % (length -1);
        const move = val + i ;
        const target = move <= 0 ? move + length - 1: (move >= length - 1 ? move - length + 1: move);


        // console.log(input.map((x) => x.val).join(','));
        // console.log(i, input[i], val, move, target);

        input.splice(i, 1);
        input.splice(target, 0, item);

        if (target <= i) {
            i++;
        }

    }

    // console.log(input.map((x) => x.val).join(','));

    const zeroIdx = input.findIndex((x) => x.val === 0);
    console.log(zeroIdx, (zeroIdx + 1000)%length, (zeroIdx + 2000)%length, (zeroIdx +3000)%length);

    const value = input[(zeroIdx + 1000)%length].val + input[(zeroIdx + 2000)%length].val + input[(zeroIdx + 3000)%length].val;
    return {value};
});