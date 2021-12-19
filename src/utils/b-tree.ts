import { Possible } from './util-types';

export class BTree<T> {

    private readonly id: number = Math.random();
    public parent?: BTree<T>;
    public left?: BTree<T>;
    public right?: BTree<T>;
    public value: T;

    constructor(value: T, relations?: {parent?: BTree<T>, left?: BTree<T>, right?: BTree<T>}) {
        this.value = value;
        this.parent = relations?.parent;
        this.left = relations?.left;
        this.right = relations?.right;
    }

    get isLeaf(): boolean {
        return this.left === undefined && this.right === undefined;
    }

    get isHead(): boolean {
        return this.parent === undefined;
    }

    get leafToLeft(): Possible<BTree<T>> {
        let current: BTree<T> = this;

        while(current.parent && current === current.parent.left) {
            current = current.parent!;
        }

        if (current.isHead) {
            return;
        }

        current = current.parent!.left!;

        while(current.right !== undefined) {
            current = current.right;
        }

        return current;
    }

    get leafToRight(): Possible<BTree<T>> {
        let current: BTree<T> = this;

        while(current.parent && current === current.parent.right) {
            current = current.parent!;
        }

        if (current.isHead) {
            return;
        }

        current = current.parent!.right!;

        while(current.left !== undefined) {
            current = current.left;
        }

        return current;
    }

    forEachLtR(func: (leaf: BTree<T>) => void): void {
        this.everyLeafLtR((l) => {
            func(l);
            return true;
        });
    }

    someLeafLtR(func: (leaf: BTree<T>) => boolean): boolean {
        let current: Possible<BTree<T>> = this;
        while (current.left) {
            current = current.left;
        }

        let sum = false;
        while(!sum && current) {
            sum = sum || func(current);
            current = current.leafToRight;
        }

        return sum;
    }

    everyLeafLtR(func: (leaf: BTree<T>) => boolean): boolean {
        let current: Possible<BTree<T>> = this;
        while (current.left) {
            current = current.left;
        }

        let sum = true;
        while(sum && current) {
            sum = sum && func(current);
            current = current.leafToRight;
        }

        return sum;
    }

    get depth(): number {
        let d = 0;
        let current: BTree<T> = this;
        while (current.parent) {
            current = current.parent;
            d++;
        }

        return d;
    }
}