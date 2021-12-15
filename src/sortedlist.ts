export class SortedList<T> {
    private list: T[];

    constructor(
        private comparator: (a: T, b: T) => number
    ) {
        this.list = [];
    }

    queue(value: T) {
        const i = this.list.findIndex((a) => this.comparator(value, a) < 0);
        if (i >= 0) {
            this.list.splice(i, 0, value);
        }
        else {
            this.list.push(value);
        }
    }

    peek(): T | undefined {
        return this.list[0];
    }

    dequeue(): T | undefined {
        const x = this.list[0];
        this.list.splice(0, 1);
        return x;
    }

    get values() {
        return this.list;
    }

    delete(func: (value: T) => boolean): void {
        const i = this.list.findIndex(func)
        if (i >= 0) {
            this.list.splice(i, 1);
        }
    }
}

// const s = new SortedList<number>((a, b) => a-b);

// s.queue(5);
// s.queue(3);
// s.queue(2);
// s.queue(1);

// console.log(s.values);

// s.delete((x) => x === 3);

// console.log(s.values);