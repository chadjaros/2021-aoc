import { aoc } from '../../utils/aoc';

interface Eqn {
    var0: string;
    isValue: boolean;
    value: number;
    var1: string;
    var2: string;
    op: string;
}

aoc((infile) => {

    const operations = new Map([
        ['+', (a: number, b: number) => a+b],
        ['-', (a: number, b: number) => a-b],
        ['*', (a: number, b: number) => a*b],
        ['/', (a: number, b: number) => a/b],
    ]);

    const input = new Map(infile
        // .sample()
        .splitLines(/:? /)
        .filter((x) => x[0] !== 'humn')
        .map((x) => {
            const value = parseInt(x[1]);
            const var0 = x[0];
            const var1 = x[1];
            const op = x[0] === 'root' ? '=' : x[2];
            const var2 = x[3];
            return [x[0], {
                var0,
                isValue: !isNaN(value),
                value,
                var1,
                var2,
                op
            }];
        }));

    const invertedInput = new Map();
    for (const [id, val] of input) {
        if (!val.isValue) {
            invertedInput.set(val.var1, val);
            invertedInput.set(val.var2, val);
        }
    }

    const visited = new Set<string>();

    function resolve(varName: string): number {

        let entry: Eqn = input.get(varName)!;
        let inverted = false;

        if (entry === undefined || visited.has(entry.var0)) {
            const invOrig = invertedInput.get(varName)!;
            visited.add(invOrig.var0);
            entry = invert(varName, invOrig);
            inverted = true;
        }
        else {
            visited.add(entry.var0);
        }


        // console.log('resolve', varName, inverted ? 'inverted' : '', entry.var0, entry.value, entry.var1, entry.op, entry.var2);
        if (entry.var0 === 'root') {
            const other = [entry.var1, entry.var2].filter(x => x !== varName)[0];
            return resolve(other);
        }
        else if (entry.isValue) {
            return entry.value;
        }

        const val1 = resolve(entry.var1);
        const val2 = resolve(entry.var2);

        return operations.get(entry.op)!(val1, val2);
    }

    function invert(varName: string, entry: Eqn): Eqn {
        const other = [entry.var1, entry.var2].filter(x => x !== varName)[0];

        if (other === undefined) {
            console.log('other undefined', varName, entry);
            throw new Error('other undefined');
        }
        if (entry.op === '=') {
            return entry;
        }
        if (entry.op === '+') {
            // a = b + c => b = a - c
            return {
                var0: varName,
                var1: entry.var0,
                var2: other,
                isValue: false,
                value: NaN,
                op: '-'
            };
        }
        else if (entry.op === '*') {
            // a = b * c => b = a / c
            return {
                var0: varName,
                var1: entry.var0,
                var2: other,
                isValue: false,
                value: NaN,
                op: '/'
            };
        }
        else if (entry.op === '-' && varName === entry.var1) {
            // a = b - c => b = a + c
            return {
                var0: varName,
                var1: entry.var0,
                var2: other,
                isValue: false,
                value: NaN,
                op: '+'
            };
        }
        else if (entry.op === '-' && varName === entry.var2) {
            // a = c - b => b = c - a
            return {
                var0: varName,
                var1: other,
                var2: entry.var0,
                isValue: false,
                value: NaN,
                op: '-'
            };
        }
        else if (entry.op === '/' && varName === entry.var1) {
            // a = b / c => b = a * c
            return {
                var0: varName,
                var1: entry.var0,
                var2: other,
                isValue: false,
                value: NaN,
                op: '*'
            };
        }
        else if (entry.op === '/' && varName === entry.var2) {
            // a = c / b => b = c / a
            return {
                var0: varName,
                var1: entry.var0,
                var2: other,
                isValue: false,
                value: NaN,
                op: '/'
            };
        }

        console.log('inversion not found', varName, entry);
        throw Error('inversion not found');
    }

    const value = resolve('humn');

    return {value};
});