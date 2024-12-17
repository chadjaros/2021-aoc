import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines.reduce((acc, v) => {

        if (v.startsWith('Register')) {
            acc.registers.set(v[9], parseInt(v.slice(12)));
        }
        else if (v.startsWith('Program')) {
            acc.instructions = v.slice(9).split(',').map((_) => parseInt(_));
        }
        return acc;
    }, { registers: new Map<string, number>(), instructions: new Array<number>() });

    const combo = (op: number): number => {
        if (op === 4) {
            return input.registers.get('A')!;
        }
        else if (op === 5) {
            return input.registers.get('B')!;
        }
        else if (op === 6) {
            return input.registers.get('C')!;
        }
        else if (op === 7) {
            throw new Error('invalid op');
        }

        return op;
    };

    let output: number[] = [];

    const instructions = new Map<number, (x: number) => (number | undefined)>([
        [0, (op: number): undefined => {
            input.registers.set('A', Math.floor(input.registers.get('A')! / Math.pow(2, combo(op))));
        }],
        [1, (op: number): undefined => {
            input.registers.set('B', Number(BigInt(input.registers.get('B')!) ^ BigInt(op)));
        }],
        [2, (op: number): undefined => {
            input.registers.set('B', combo(op) % 8);
        }],
        [3, (op: number): number | undefined => {
            if (input.registers.get('A') === 0) {
                return;
            }
            return op;
        }],
        [4, (op: number): undefined => {
            input.registers.set('B', Number(BigInt(input.registers.get('B')!) ^ BigInt(input.registers.get('C')!)));
        }],
        [5, (op: number): undefined => {
            output.push(combo(op) % 8);
        }],
        [6, (op: number): undefined => {
            input.registers.set('B', Math.floor(input.registers.get('A')! / Math.pow(2, combo(op))));
        }],
        [7, (op: number): undefined => {
            input.registers.set('C', Math.floor(input.registers.get('A')! / Math.pow(2, combo(op))));
        }],
    ]);

    const run = (withA: number): string => {

        input.registers = new Map([['A', withA], ['B', 0], ['C', 0]]);
        output = [];

        try {
            let instPtr = 0;
            while (instPtr < input.instructions.length) {
                const result = instructions.get(input.instructions[instPtr])!(input.instructions[instPtr + 1]);

                if (result !== undefined) {
                    instPtr = result;
                }
                else {
                    instPtr += 2;
                }
            }
        } catch (err) {
            // do nothing
        }

        return output.join(',');
    };

    const findMatches = (start: number, match: string): number[] => {
        const matches: number[] = [];
        for (let i = 0; i < 64; i++) {
            const t = run(start + i);
            if (t === match) {
                matches.push(start + i);
            }
        }
        return matches;
    };

    const search = (start: { tailLength: number, value: number; }) => {
        const frontier = [start];

        while (frontier.length > 0) {
            const current = frontier.shift()!;
            const matchTarget = input.instructions.slice(-1 * current.tailLength).join(',');
            const matchValues = findMatches(current.value * 64, matchTarget);
            if (current.tailLength === input.instructions.length && matchValues.length > 0) {
                return matchValues[0];
            }
            frontier.push(...matchValues.map((_) => ({ tailLength: current.tailLength + 2, value: _ })));
        }

        throw new Error('not found');
    };

    const value = search({ tailLength: 2, value: 0 });

    return { value };
});
