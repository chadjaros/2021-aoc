import { Edge, Graph, Node } from './graph';
import { Point } from './point-2d';
import { Possible } from './util-types';

export type GridScanCallback<T> = (value: T, point: Point) => boolean | void;
export type GridReduceCallback<T, U> = (acc: U, value: T, point: Point) => U;
export type GridEdgeFunction<T> = (p: Point, g: Grid<T>) => Edge[];

export class GridNode<T> implements Node {
    constructor(
        public point: Point,
        public grid: Grid<T>,
        private edgefn: GridEdgeFunction<T>
    ) { }

    get id() {
        return this.point.key;
    }

    get edges(): Edge[] {
        return this.edgefn(this.point, this.grid);
    }

    get value(): T {
        return this.grid.getValue(this.point);
    }
}

export class Grid<T> implements Graph<GridNode<T>> {
    private nodeCache: Map<string, GridNode<T>> = new Map();
    private values: T[][];

    constructor(
        values: T[][],
        private edgefn: GridEdgeFunction<T> = (p, g) =>
            g.adjacentTo(p, false).map((p) => ({ nodeId: p.key, weight: 1 }))
    ) {
        this.values = values.map((r) => [...r]);
    }

    static fromSize<T>(
        width: number,
        height: number,
        defaultVal: T | (() => T),
        edgeFn?: GridEdgeFunction<T>
    ): Grid<T> {
        const v: T[][] = [];
        for (let y = 0; y < height; y++) {
            const row: T[] = [];
            v.push(row);
            for (let x = 0; x < width; x++) {
                row.push(
                    typeof defaultVal === 'function'
                        ? (defaultVal as () => T)()
                        : (defaultVal as T)
                );
            }
        }

        return new Grid(v, edgeFn);
    }

    getNode(id: string): GridNode<T> {
        if (this.nodeCache.has(id)) {
            return this.nodeCache.get(id)!;
        }
        return this.nodeAt(Point.fromKey(id));
    }

    nodeAt(p: Point): GridNode<T> {
        if (this.nodeCache.has(p.key)) {
            return this.nodeCache.get(p.key)!;
        }
        if (this.isValid(p)) {
            const n = new GridNode(p, this, this.edgefn);
            this.nodeCache.set(n.id, n);
            return n;
        }
        throw new Error(`No grid node at '${p.key}'`);
    }

    isValid(point: Point): boolean {
        return (
            point.x >= 0 &&
            point.y >= 0 &&
            point.x < this.width &&
            point.y < this.height
        );
    }

    isEdge(point: Point): boolean {
        return (
            point.x === 0 ||
            point.y === 0 ||
            point.x === this.width - 1 ||
            point.y === this.height - 1
        );
    }

    getValue(point: Point): T {
        return this.values[point.y][point.x];
    }

    setValue(point: Point, value: T): T {
        this.values[point.y][point.x] = value;
        return value;
    }

    get width(): number {
        return this.values[0].length;
    }

    get height(): number {
        return this.values.length;
    }

    adjacentTo(p: Point, diagonals: boolean): Point[] {
        return p.adjacents(diagonals).filter((p) => this.isValid(p));
    }

    forEach(cb: GridScanCallback<T>): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                if (cb(this.getValue(p), p)) {
                    return;
                }
            }
        }
    }

    reduce<U>(cb: GridReduceCallback<T, U>, init: U): U {
        let value = init;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                value = cb(value, this.getValue(p), p);
            }
        }
        return value;
    }


    forEachRev(cb: GridScanCallback<T>): void {
        for (let x = this.width - 1; x >= 0; x--) {
            for (let y = this.height - 1; y >= 0; y--) {
                const p = new Point(x, y);
                if (cb(this.getValue(p), p)) {
                    return;
                }
            }
        }
    }

    find(cb: GridScanCallback<T>): Possible<Point> {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                if (cb(this.getValue(p), p)) {
                    return p;
                }
            }
        }
    }

    filter(cb: GridScanCallback<T>): Point[] {
        const result: Point[] = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                if (cb(this.getValue(p), p)) {
                    result.push(p);
                }
            }
        }
        return result;
    }

    scanDecXFrom(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let x = point.x - 1; x >= 0; x--) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanIncXFrom(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let x = point.x + 1; x < this.width; x++) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanDecYFrom(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let y = point.y - 1; y >= 0; y--) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanIncYFrom(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let y = point.y + 1; y < this.height; y++) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanDecXTo(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let x = this.width - 1; x > point.x; x--) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanIncXTo(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let x = 0; x < point.x; x++) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanDecYTo(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let y = this.height - 1; y > point.y; y--) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanIncYTo(point: Point, cb: GridScanCallback<T>): Possible<Point> {
        for (let y = 0; y < point.y; y++) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    scanAdjacents(
        point: Point,
        diagonals: boolean,
        cb: GridScanCallback<T>
    ): Possible<Point> {
        for (const p of this.adjacentTo(point, diagonals)) {
            if (cb(this.getValue(p), p)) {
                return p;
            }
        }
    }

    print(fn: (x: T, p: Point) => string = (x) => x as string): void {
        for (let y = 0; y < this.height; y++) {
            let str = '';
            for (let x = 0; x < this.width; x++) {
                const p = new Point(x, y);
                str += fn(this.getValue(p), p);
            }
            console.log(str);
        }
    }

    toString(fn: (x: T) => string = (x) => x as string): string {
        let result = '';
        for (const line of this.values) {
            result += line.map(fn).join('') + '\n';
        }
        return result;
    }

    clone(deepCopyFn: (value: T) => T): Grid<T> {
        return new Grid(this.values.map((l) => l.map((v) => deepCopyFn(v))));
    }
}
