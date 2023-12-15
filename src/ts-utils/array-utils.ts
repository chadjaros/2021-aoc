export class ArrayUtils {

    static init<T>(arr: T[]): T[] {
        return arr.slice(0, arr.length - 1);
    }

    static last<T>(arr: T[]): T {
        return arr[arr.length - 1];
    }

    static head<T>(arr: T[]): T {
        return arr[0];
    }

    static tail<T>(arr: T[]): T[] {
        return arr.slice(1);
    }

    static transpose<T>(arr: T[][]): T[][] {
        const result: T[][] = [];
        for (let x = 0; x < arr[0].length; x++) {
            result.push([]);
            for (let y = 0; y < arr.length; y++) {
                result[x].push(arr[y][x]);
            }
        }
        return result;
    }

    static removeIndex<T>(arr: T[], idx: number): T[] {
        return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    }
}
