import { Series } from '../../utils/series';
import { ALUInstruction, input24 } from './input';
import { ALU } from './model';


const dInstructions = input24.reduce<{digit: number, values: ALUInstruction[][]}>((accum, val) => {
    if (val[0] === 'inp') {
        accum.digit++;
        accum.values.push([]);
    }

    accum.values[accum.digit-1].push(val);
    return accum;
}, ({digit: 0, values: []}));

interface Pair {
    start: number; 
    end: number;
}

const stack: number[] = [];
const operations = dInstructions.values.reduce<Pair[]>((accum, x, i) => {
    if (x[4][2] === 1) {
        stack.push(i);
        return accum;
    }
    else {
        return [...accum, {start: stack.pop()!, end: i}];
    }
}, []).sort((a, b) => a.start - b.start);

operations.forEach((x) => console.log(x));

function findPairForIndex(d: number, e: number): Pair {

    for (const f of Series.range(9, 1)) {
        for (const g of Series.range(9, 1)) {
            const a = new ALU();

            a.run(f, dInstructions.values[d]);
            a.run(g, dInstructions.values[e]);

            if (a.vars.get('z') === 0) {
                return {start: f, end: g};
            }
        }
    }
    return {start: -1, end: -1};
}

const result = operations.reduce<number[]>((accum, x) => {
    const pair = findPairForIndex(x.start, x.end);
    accum[x.start] = pair.start;
    accum[x.end] = pair.end;
    return accum;
}, [...Series.of(14, 0)]);

console.log(result.join(''));