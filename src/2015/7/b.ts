import { input7, Instruction7 } from './input';

const inputs = new Map(input7.map<[string, Instruction7]>((x) => [x.assign, x]));

const max = 65535;

let vars = new Map<string, number>();

type Op = (l: string, r: string|undefined) => number;

const ops = new Map<string, Op>([
    ['AND', (l, r) => get(l) & get(r)] ,
    ['OR', (l, r) => get(l) | get(r)],
    ['LSHIFT', (l, r) => (get(l) << get(r)) & max],
    ['RSHIFT', (l, r) => get(l) >> get(r)],
    ['NOT', (l) => (~get(l)) & max],
    ['ASSIGN', (l) => get(l)],
]);

const get = (x: string|undefined): number => {
    if (x === undefined) {
        return 0;
    }

    const parsed = parseInt(x);
    if (isNaN(parsed)) {
        if (!vars.has(x)) {
            const i = inputs.get(x)!;
            vars.set(i.assign, ops.get(i.op)!(i.left, i.right));
        }
        return vars.get(x)!;
    }
    return parsed;
};

const part1 = get('a');

inputs.set('b', {op: 'ASSIGN', assign: 'b', left: '' + part1, right: undefined});
vars = new Map<string, number>();

console.log(get('a'));
