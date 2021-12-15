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

    dequeue(value: T): T | undefined {
        return this.list.pop();
    }

    get values() {
        return this.list;
    }
}