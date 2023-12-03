export function binToDec(value: boolean[]) {
    let sum = 0;
    for (let x = 0; x < value.length; x++) {
        if (value[value.length - 1 - x]) {
            sum += Math.pow(2, x);
        }
    }
    return sum;
}

const convertMap = new Map([
    ['0', [false, false, false, false]],
    ['1', [false, false, false, true]],
    ['2', [false, false, true, false]],
    ['3', [false, false, true, true]],
    ['4', [false, true, false, false]],
    ['5', [false, true, false, true]],
    ['6', [false, true, true, false]],
    ['7', [false, true, true, true]],
    ['8', [true, false, false, false]],
    ['9', [true, false, false, true]],
    ['A', [true, false, true, false]],
    ['B', [true, false, true, true]],
    ['C', [true, true, false, false]],
    ['D', [true, true, false, true]],
    ['E', [true, true, true, false]],
    ['F', [true, true, true, true]],
]);

export function hexToBinary(s: string): boolean[] {
    return s.split('').flatMap((x) => convertMap.get(x)!);
}
