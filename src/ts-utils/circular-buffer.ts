const placeholder = Symbol();

export class CircularBuffer<T> {
    private _buffer: T[] = [];

    constructor(
        readonly capacity: number,
        values?: T[]
    ) {
        if (values !== undefined) {
            this.push(...values);
        }
    }

    push(...value: T[]): number {
        this._buffer.push(...value);

        while (this._buffer.length > this.capacity) {
            this._buffer.shift();
        }

        return this.size;
    }

    pop(): T | undefined {
        return this._buffer.pop();
    }

    shift(): T | undefined {
        return this._buffer.shift();
    }

    unshift(...value: T[]): number {
        this._buffer.unshift(...value);

        while (this._buffer.length > this.capacity) {
            this._buffer.pop();
        }

        return this.size;
    }

    get size(): number {
        return this._buffer.length;
    }

    valueAt(index: number): T | undefined {
        return this._buffer[index];
    }

    get values(): readonly T[] {
        return this._buffer;
    }
}

export class CircularBuffer2<T> {
    private _buffer: (T | symbol)[] = [];
    private _start = 0;
    private _size = 0;

    constructor(
        readonly capacity: number,
        values?: T[]
    ) {
        for (let i = 0; i < capacity; i++) {
            this._buffer.push(placeholder);
        }
        if (values !== undefined) {
            this.push(...values);
        }
    }

    private nextIndex(v: number): number {
        let result = v + 1;
        if (result >= this.capacity) {
            result = 0;
        }
        return result;
    }

    private prevIndex(v: number): number {
        let result = v - 1;
        if (result < 0) {
            result = this.capacity - 1;
        }
        return result;
    }

    private get _end(): number {
        const e = this._start + this._size;
        return e >= this.capacity ? e - this.capacity : e;
    }

    push(...value: T[]): number {
        for (const v of value) {
            this._buffer[this._end] = v;

            if (this._size === this.capacity) {
                this._start = this.nextIndex(this._start);
            } else {
                this._size += 1;
            }
        }

        return this.size;
    }

    pop(): T | undefined {
        if (this.size === 0) {
            return undefined;
        }

        this._size -= 1;
        const result = this._buffer[this._end] as T;
        return result;
    }

    shift(): T | undefined {
        if (this.size === 0) {
            return undefined;
        }

        const result = this._buffer[this._start] as T;
        this._start = this.nextIndex(this._start);
        this._size -= 1;
        return result;
    }

    unshift(...value: T[]): number {
        for (const v of value) {
            this._start = this.prevIndex(this._start);
            this._buffer[this._start] = v;
            if (this.size !== this.capacity) {
                this._size += 1;
            }
        }

        return this.size;
    }

    get size(): number {
        return this._size;
    }

    valueAt(index: number): T | undefined {
        if (index >= this.size) {
            return undefined;
        }

        let idx = this._start + index;
        if (idx >= this.capacity) {
            idx -= this.capacity;
        }

        return this._buffer[idx] as T;
    }

    get values(): T[] {
        const result: T[] = [];
        for (let i = 0; i < this.size; i++) {
            let idx = this._start + i;
            if (idx >= this.capacity) {
                idx -= this.capacity;
            }
            result.push(this._buffer[idx] as T);
        }

        return result;
    }
}

// import { Series } from './series';
// const c = new CircularBuffer<number>(5);

// c.push(...Series.range(1, 14));

// console.log(c.values, c.size);

// c.unshift(6);

// console.log(c.values, c.size);

// console.log(c.pop(), c.values, c.size);

// console.log(c.shift(), c.values, c.size);

// c.unshift(...Series.range(3, 5));
// console.log(c.values, c.size);

// console.log(c.valueAt(0), c.valueAt(2), c.valueAt(c.size -1), c.valueAt(c.size), c.capacity);
