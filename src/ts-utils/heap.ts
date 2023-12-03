/**
 * Implements a binary min heap.
 */
export class Heap<T> {
    private list: T[] = [];

    constructor(
        readonly comparator: (a: T, b: T) => number,
        readonly isEqual: (a: T, b: T) => boolean = (a: T, b: T) =>
            comparator(a, b) === 0
    ) {}

    insert(value: T): void {
        this.list.push(value);
        this.bubbleUp(this.list.length - 1);
    }

    hasFront(): boolean {
        return this.size !== 0;
    }

    front(): T | undefined {
        if (!this.hasFront()) {
            return undefined;
        }

        return this.list[0];
    }

    popFront(): T | undefined {
        const front = this.list[0];
        const end = this.list.pop();

        if (this.size > 0) {
            this.list[0] = end!;
            this.bubbleDown(0);
        }

        return front;
    }

    insertThenPopFront(value: T): T | undefined {
        const front = this.front();
        // If front exists and is smaller than the new value,
        // swap them and return front
        if (front !== undefined && this.comparator(value, front) >= 0) {
            this.list[0] = value;
            this.bubbleDown(0);
            return front;
        }

        // otherwise return the passed in value
        return value;
    }

    private bubbleUp(i: number): number {
        let currentIdx = i;

        while (currentIdx > 0) {
            const parentIdx = Math.floor((currentIdx + 1) / 2) - 1;

            // if parent is smaller than current, all is good
            if (
                this.comparator(this.list[currentIdx], this.list[parentIdx]) >=
                0
            ) {
                break;
            }

            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
        }

        return currentIdx;
    }

    private bubbleDown(i: number): number {
        let currentIdx = i;
        const size = this.size;

        while (true) {
            const rightChildIdx = (currentIdx + 1) * 2;
            const leftChildIdx = rightChildIdx - 1;

            let swapIdx: number | undefined = undefined;
            if (leftChildIdx < size) {
                // if left child is smaller than current, swap
                if (
                    this.comparator(
                        this.list[currentIdx],
                        this.list[leftChildIdx]
                    ) >= 0
                ) {
                    swapIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < size) {
                // If right child is smaller than current or left, swap with right instead
                if (
                    this.comparator(
                        this.list[swapIdx === undefined ? currentIdx : swapIdx],
                        this.list[rightChildIdx]
                    ) >= 0
                ) {
                    swapIdx = rightChildIdx;
                }
            }

            if (swapIdx === undefined) {
                // If no swap is indicated, all is in order
                return currentIdx;
            }

            this.swap(currentIdx, swapIdx);
            currentIdx = swapIdx;
        }
    }

    private swap(i: number, j: number): void {
        const tmp = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = tmp;
    }

    get size(): number {
        return this.list.length;
    }

    values(sorted = false): T[] {
        const l = [...this.list];
        if (sorted) {
            l.sort(this.comparator);
        }
        return l;
    }

    replace(value: T, withValue: T): boolean {
        const idx = this.list.findIndex((x) => this.isEqual(x, value));

        if (idx >= 0) {
            this.list[idx] = withValue;

            const buIdx = this.bubbleUp(idx);
            if (buIdx === idx) {
                this.bubbleDown(idx);
            }
        }

        return idx >= 0;
    }

    delete(value: T): boolean {
        const idx = this.list.findIndex((x) => this.isEqual(x, value));

        if (idx === this.size - 1) {
            this.list.pop();
        } else if (idx >= 0) {
            this.swap(idx, this.size - 1);
            this.list.pop();

            const buIdx = this.bubbleUp(idx);
            if (buIdx === idx) {
                this.bubbleDown(idx);
            }
        }

        return idx >= 0;
    }
}

// const s = new Heap<number>((a, b) => a-b);

// s.insert(5);
// s.insert(3);
// s.insert(2);
// s.insert(1);
// s.insert(6);
// s.insert(4);
// s.insert(7);
// s.insert(0);
// s.insert(9);
// s.insert(8);

// console.log(s.insertThenPopFront(4));
// console.log(s.insertThenPopFront(-1));

// console.log(s.replace(5, 0));
// console.log(s.delete(3));

// while(s.front() !== undefined) {
//     console.log(s.popFront());
// }
