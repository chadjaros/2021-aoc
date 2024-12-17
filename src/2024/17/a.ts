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

    const output: number[] = [];

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

    const instructions = new Map<number, (x: number) => (number | undefined)>([
        [0, (op: number): undefined => {
            input.registers.set('A', Math.floor(input.registers.get('A')! / Math.pow(2, combo(op))));
        }],
        [1, (op: number): undefined => {
            input.registers.set('B', input.registers.get('B')! ^ op);
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
            input.registers.set('B', input.registers.get('B')! ^ input.registers.get('C')!);
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

    const value = output.join(',');
    return { value };
});
