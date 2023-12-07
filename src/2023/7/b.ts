import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';

const cardValues: ReadonlyMap<string, number> = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 1],
    ['T', 10],
    ...Array.from(Series.range(9, 2)).map<[string, number]>((x) => [
        x.toString(),
        x,
    ]),
]);

class HandType {
    constructor(
        readonly name: string,
        readonly rank: number,
        readonly detect: (t: Array<[string, number]>) => boolean
    ) {}
}

const handTypes: readonly HandType[] = [
    new HandType('High Card', 1, (t) => t.length === 5),
    new HandType('One Pair', 2, (t) => t.length === 4 && t[0][1] == 2),
    new HandType('Two Pair', 3, (t) => t.length === 3 && t[0][1] == 2),
    new HandType('Three of a Kind', 4, (t) => t.length === 3 && t[0][1] == 3),
    new HandType('Full House', 5, (t) => t.length === 2 && t[0][1] == 3),
    new HandType('Four of a Kind', 6, (t) => t.length === 2 && t[0][1] == 4),
    new HandType('Five of a Kind', 7, (t) => t.length === 1),
];

class Hand {
    constructor(
        readonly type: HandType,
        readonly cards: string[],
        readonly cardCount: [string, number][],
        readonly wager: number
    ) {}
    compare(other: Hand): number {
        if (this.type.rank != other.type.rank) {
            return this.type.rank - other.type.rank;
        }

        for (let i = 0; i < this.cards.length; i++) {
            const myCardVal = cardValues.get(this.cards[i])!;
            const otherCardVal = cardValues.get(other.cards[i])!;
            if (myCardVal != otherCardVal) {
                return myCardVal - otherCardVal;
            }
        }
        return 0;
    }
}

aoc((infile) => {
    const hands = infile.lines
        .map((line) => {
            const splits = line.split(' ');

            const wager = parseInt(splits[1]);
            const cards = splits[0].split('');
            const cardCounts = [
                ...cards
                    .reduce((acc, cur) => {
                        const count = acc.get(cur) || 0;
                        acc.set(cur, count + 1);
                        return acc;
                    }, new Map<string, number>())
                    .entries(),
            ].sort((a, b) => {
                if (b[1] === a[1]) {
                    return cardValues.get(b[0])! - cardValues.get(a[0])!;
                }
                return b[1] - a[1];
            });

            let jokerConv = cardCounts.filter((x) => x[0] !== 'J');
            if (jokerConv.length > 0) {
                jokerConv[0][1] +=
                    cardCounts.find((x) => x[0] === 'J')?.[1] ?? 0;
            } else {
                jokerConv = cardCounts;
            }

            const handType = handTypes.find((x) => x.detect(jokerConv));

            return new Hand(handType!, cards, cardCounts, wager);
        })
        .sort((a, b) => a.compare(b));

    return {
        value: hands.reduce((acc, hand, idx) => {
            return acc + hand.wager * (idx + 1);
        }, 0),
    };
});
