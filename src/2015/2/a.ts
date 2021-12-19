import { input2 } from './input';

const input = input2;

export function paperNeeds(box: number[]): {box: number, extra: number} {
    const sides = [...box].sort((a, b) => a - b);

    return {
        box: sides[0] * sides[1] * 2 + sides[1] * sides[2] * 2 + sides[0] * sides[2] * 2,
        extra: sides[0] * sides[1]
    };
}

const answer = input.reduce((accum, b) => {
    const need = paperNeeds(b);
    return accum + need.box + need.extra;
}, 0);

console.log(answer);