import { aoc } from '../../ts-utils/aoc';
import { intersection } from '../../ts-utils/set-math';

aoc((infile) => {
    const value = infile.lines
        .map((x) => {
            const game = x.split(/:\s*/);
            const card = parseInt(game[0].split(/\s+/)[1]);
            const nums = game[1].split(' | ');

            return {
                card,
                winners: new Set(nums[0].split(/\s+/).map((_) => parseInt(_))),
                cardNums: new Set(nums[1].split(/\s+/).map((_) => parseInt(_)))
            };
        })
        .reduce((acc, v) => {
            const matches = intersection(v.winners, v.cardNums).size;
            if (matches > 0) {
                return acc + Math.pow(2, matches - 1);
            }
            return acc;
        }, 0);

    return { value };
});
