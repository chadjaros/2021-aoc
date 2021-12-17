export declare class OrderedList<T> {
    private comparator;
    private list;
    constructor(comparator: (a: T, b: T) => number);
    queue(value: T): void;
    peek(): T | undefined;
    dequeue(): T | undefined;
    get values(): T[];
    delete(func: (value: T) => boolean): void;
}
