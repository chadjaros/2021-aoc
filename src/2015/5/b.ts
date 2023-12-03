import { input5 } from './input';

const input = input5;

const result = input.filter((x) => {
    const splits = x.split('');
    const pairs = new Set<string>();
    let twoPair = false;
    let double = false;
    let nextPair = undefined;
    for (let i = 0; i < splits.length; i++) {
        if (i > 0) {
            const pair = [splits[i - 1], splits[i]].join('');
            if (pairs.has(pair)) {
                twoPair = true;
            }
            if (nextPair) {
                pairs.add(nextPair);
            }
            nextPair = pair;
        }
        if (i > 1) {
            if (splits[i - 2] === splits[i]) {
                double = true;
            }
        }
    }

    return twoPair && double;
});

console.log(result.length);
