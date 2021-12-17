import { input14rules, input14start } from './input';

let string = input14start;
const rules = input14rules;

const start = string[0];
let tuples = new Map<string, number>();
let tuplesNext = new Map<string, number>();

for (let i = 0; i < string.length - 1; i++) {
    const tup = string.slice(i, i + 2);
    tuples.set(tup, (tuples.get(tup) ?? 0) + 1);
}

// console.log(start, tuples)

for (let round = 0; round < 40; round++) {

    for (const [tuple, count] of tuples) {
        const insertion = rules.get(tuple);
        if (insertion) {
            const tupleOne = tuple[0] + insertion;
            const tupleTwo = insertion + tuple[1];
            tuplesNext.set(tupleOne, (tuplesNext.get(tupleOne) ?? 0) + count);
            tuplesNext.set(tupleTwo, (tuplesNext.get(tupleTwo) ?? 0) + count);
        }
        else {
            tuplesNext.set(tuple, (tuplesNext.get(tuple) ?? 0) + count);
        }
    }

    tuples = tuplesNext;
    tuplesNext = new Map<string, number>();
}

const counts = new Map<string, number>();
for (const [tup, count] of tuples) {
    const l = tup[1];
    counts.set(l, (counts.get(l) ?? 0) + count);
}
counts.set(start, (counts.get(start) ?? 0) + 1)

const sorted = [...counts].sort((a, b) => b[1]-a[1]);
console.log(sorted);
console.log(sorted[0][1] - sorted[sorted.length-1][1]);
