export function seriesSum(func: (value: number) => number, start: number, end: number): number {
    let sum = 0;
    for (let v = start; v < end; v++) {
        sum += func(v);
    }
    return sum;
}