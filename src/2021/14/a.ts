import { input14rules, input14start } from './input';

let string = input14start;
const rules = input14rules;

for (let round = 0; round < 10; round++) {
    for (let i = 0; i < string.length - 1; i++) {
        // console.log(round, i, string.slice(i, i+2));
        const insertion = rules.get(string.slice(i, i + 2));
        if (insertion) {
            // console.log(string, i, insertion);
            string = string.slice(0, i + 1) + insertion + string.slice(i + 1);
            i++;
            // console.log(string);
        }
    }
}

const counts = new Map<string, number>();
for (const l of string) {
    counts.set(l, (counts.get(l) ?? 0) + 1);
}

const sorted = [...counts].sort((a, b) => b[1] - a[1]);
console.log(sorted);
console.log(sorted[0][1] - sorted[sorted.length - 1][1]);
