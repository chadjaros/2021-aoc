import { input17 } from './input';


const input = input17;
const totalLiters = 150;

function combinations(source: number[], path: number[], sum: number): number[][] {
    if (sum === totalLiters) {
        return [path];
    }
    else if (sum > totalLiters) {
        return [];
    }

    if (source.length === 0) {
        return [];
    }

    const head = source[0];
    const tail = source.slice(1, source.length);

    return [...combinations(tail, path, sum), ...combinations(tail, [...path, head], sum + head)];
}

const c = combinations(input, [], 0);

const minNum = c.reduce((a, value) => {
    if (value.length < a) {
        return value.length;
    }
    return a;
}, Infinity);

console.log(c.filter((x) => x.length === minNum).length);