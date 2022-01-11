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

console.log(combinations(input, [], 0).length);