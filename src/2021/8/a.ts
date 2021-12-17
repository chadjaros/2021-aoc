import { Digits, input8 } from './input';

function main() {
    let count = 0;
    const knownDigits = new Set([Digits.get(1)?.count, Digits.get(4)?.count, Digits.get(7)?.count, Digits.get(8)?.count]);
    for (const v of input8) {
        for (const n of v.output) {
            if (knownDigits.has(n.length)) {
                count++;
            }
        }
    }

    console.log(count);
}

main();
