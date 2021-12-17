export declare class OrderedMap<K, T> {
    private map;
    private list;
    private comparator;
    constructor(comparator: (a: T, b: T) => number);
    set(key: K, value: T): void;
    has(key: K): boolean;
    get(key: K): T | undefined;
    front(): [K, T] | undefined;
    popFront(): [K, T] | undefined;
    get values(): [K, T][];
    delete(key: K): [K, T] | undefined;
}
