import { input12 } from './input';

const input = input12;

const count = (json: unknown): number => {
    if (typeof json === 'number') {
        return json as number;
    }
    else if (Array.isArray(json)) {
        const arr = json as unknown[];
        return arr.reduce<number>((accum, item) => {
            return accum + count(item);
        }, 0);
    }
    else if (typeof json === 'object') {
        const obj = json as Record<string, unknown>;
        return Object.values(obj).reduce<number>((accum, item) => {
            return accum + count(item);
        }, 0);
    }
    else {
        return 0;
    }
};

console.log(count(input));