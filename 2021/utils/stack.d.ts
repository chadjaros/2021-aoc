export declare class Stack<T> {
    readonly values: T[];
    constructor(values?: T[]);
    push(it: T): void;
    pop(): T | undefined;
    get end(): T;
    get size(): number;
}
