import { binarySearch } from './binary-search';
    
export class  OrderedMap<K, T> {
    private map: Map<K, T>;
    private list: [K, T][];
    private comparator: (a: [K, T], b: [K, T]) => number;

    constructor(
        comparator: (a: T, b: T) => number
    ) {
        this.map = new Map();
        this.list = [];
        this.comparator = (a, b) => comparator(a[1], b[1]);
    }

    set(key: K, value: T) {
        if (this.map.has(key)) {
            this.delete(key);
        }

        const entry: [K, T] = [key, value];
        const i = binarySearch(this.list, entry, this.comparator).index;
        if (i >= 0) {
            this.list.splice(i, 0, entry);
        }
        else {
            this.list.push(entry);
        }
        this.map.set(key, value);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    get(key: K): T | undefined {
        return this.map.get(key);
    }

    front(): [K, T] | undefined {
        return this.list[0];
    }

    popFront(): [K, T] | undefined {
        const x = this.list[0];
        this.list.splice(0, 1);
        this.map.delete(x[0]);
        return x;
    }

    get values(): [K, T][] {
        return [...this.list];
    }

    delete(key: K): [K, T] | undefined {
        if (this.map.has(key)) {
            const value = this.map.get(key)!;
            const i = binarySearch(this.list, [key, value], this.comparator).index;
            if (i >= 0) {
                this.list.splice(i, 1);
            }
            this.map.delete(key);

            return [key, value];
        }

        return;
    }
}

// const s = new OrderedMap<number, number>((a, b) => a-b);

// s.set(5, 5);
// s.set(3, 3);
// s.set(2, 2);
// s.set(1, 1);
// s.set(6, 6);
// s.set(4, 4);

// console.log(s.values);

// s.delete(3);

// console.log(s.values);

// s.set(1, 4);

// console.log(s.values);
