export class Stack<T> {
    constructor(readonly values: T[] = []) {}

    push(it: T) {
        this.values.push(it);
    }

    pop(): T | undefined {
        return this.values.pop();
    }

    get end(): T {
        return this.values[this.values.length - 1];
    }

    get size(): number {
        return this.values.length;
    }
}
