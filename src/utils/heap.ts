/**
 * Implements a binary min heap.
 */
export class Heap<T> {
    private list: T[] = [];

    constructor(
        readonly comparator: (a: T, b: T) => number) {
    }

    insert(value: T): void {
        this.list.push(value);
        this.bubbleUp(this.list.length - 1);
    }

    front(): T | undefined {        
        if (this.size === 0) {
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

    private bubbleUp(i: number): void {
        let currentIdx = i;

        while (currentIdx > 0) {
            const parentIdx = Math.floor((currentIdx + 1) / 2) - 1;

            // if parent is smaller than current, all is good
            if (this.comparator(this.list[currentIdx], this.list[parentIdx]) >= 0) {
                return;
            }

            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
        }
    }

    private bubbleDown(i: number): void {

        let currentIdx = i;
        const size = this.size;

        while(true) {
            const rightChildIdx = (currentIdx + 1) * 2;
            const leftChildIdx = rightChildIdx - 1;

            let swapIdx: number | undefined = undefined;
            if (leftChildIdx < size) {
                // if left child is smaller than current, swap
                if (this.comparator(this.list[currentIdx], this.list[leftChildIdx]) >= 0) {
                    swapIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < size) {
                // If right child is smaller than current or left, swap with right instead
                if (this.comparator(this.list[swapIdx === undefined ? currentIdx : swapIdx], this.list[rightChildIdx]) >= 0) {
                    swapIdx = rightChildIdx;
                }
            }

            if (swapIdx === undefined) {
                // If no swap is indicated, all is in order
                return;
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
}


// const s = new Heap<number>((a, b) => a-b);

// s.insert(5);
// s.insert(3);
// s.insert(2);
// s.insert(1);
// s.insert(6);
// s.insert(4);

// console.log(s.insertThenPopFront(4));
// console.log(s.insertThenPopFront(-1));

// while(s.front()) {
//     console.log(s.popFront());
// }
