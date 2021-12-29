import { input5 } from './input';

const input = input5;

const bads = new Set(['ab', 'cd', 'pq', 'xy']);
const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

const result = input.filter((x) => {
    const splits = x.split('');
    let vowelCt = 0;
    let double = false;

    for (let i = 0; i < splits.length; i++) {
        if (vowels.has(splits[i])) {
            vowelCt++;
        }
        if (i > 0) {
            if (bads.has([splits[i-1], splits[i]].join(''))) {
                return false;
            }
            if (splits[i-1] === splits[i]) {
                double = true;
            }
        }
    }

    return vowelCt >= 3 && double;
});

console.log(result.length);