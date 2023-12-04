import { aoc } from '../../ts-utils/aoc';
import { intersection } from '../../ts-utils/set-math';

aoc((infile) => {
    const cards = infile.lines
        .map((x) => {
            const game = x.split(/:\s*/);
            const card = parseInt(game[0].split(/\s+/)[1]);
            const nums = game[1].split(' | ');

            return {
                card,
                winners: new Set(nums[0].split(/\s+/).map((_) => parseInt(_))),
                cardNums: new Set(nums[1].split(/\s+/).map((_) => parseInt(_))),
                copies: 1
            };
        });

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const matches = intersection(card.winners, card.cardNums).size;
        if (matches > 0) {
            for (let j = 1; j <= matches; j++) {
                cards[i + j].copies += card.copies;
            }
        }
    }

    const value = cards.reduce((acc, v) => acc + v.copies, 0);
    return { value };
});
