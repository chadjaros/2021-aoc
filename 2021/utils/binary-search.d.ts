export declare function binarySearch<T>(list: T[], target: T, comparator: (a: T, b: T) => number): {
    index: number;
    value: T | undefined;
    match: boolean;
};
