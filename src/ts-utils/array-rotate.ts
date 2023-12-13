export function transpose<T>(arr: T[][]): T[][] {
    const result: T[][] = [];
    for (let x = 0; x < arr[0].length; x++) {
        result.push([]);
        for (let y = 0; y < arr.length; y++) {
            result[x].push(arr[y][x]);
        }
    }
    return result;
}
