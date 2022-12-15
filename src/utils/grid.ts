import { Edge, Graph, Node } from './graph';
import { Point } from './point-2d';

export type GridScanCallback<T> = (value: T, point: Point) => boolean | void;
export type GridEdgeFunction<T> = (p: Point, g: Grid<T>) => Edge[];

export class GridNode<T> implements Node {
    constructor(
        public point: Point,
        public grid: Grid<T>,
        private edgefn: GridEdgeFunction<T>
    ) {}

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


export class Grid<T> implements Graph<GridNode<T>>{
    
    private nodeCache: Map<string, GridNode<T>> = new Map();
    private values: T[][];

    constructor(
        values: T[][],
        private edgefn: GridEdgeFunction<T> = (p, g) => g.adjacentTo(p, false).map((p) => ({nodeId: p.key, weight: 1}))
    ) {
        this.values = values.map((r) => [...r]);
    }

    static fromSize<T>(width: number, height: number, defaultVal: T, edgeFn?: GridEdgeFunction<T>): Grid<T> {
        const v: T[][] = [];
        for (let y = 0; y < height; y++) {
            const row: T[] = [];
            v.push(row);
            for (let x = 0; x < width; x++) {
                row.push(defaultVal);
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
        return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
    }

    isEdge(point: Point): boolean {
        return point.x === 0 || point.y === 0 || point.x === this.width - 1 || point.y === this.height - 1;
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
        return p.adjacents(diagonals)
            .filter((p) => this.isValid(p));
    }

    forEach(cb: GridScanCallback<T>): void {
        for(let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                if (cb(this.getValue(p), p)) {
                    return;
                }
            }
        }
    }

    scanDecXFrom(point: Point, cb: GridScanCallback<T>): void {
        for (let x = point.x - 1; x >= 0; x--) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncXFrom(point: Point, cb: GridScanCallback<T>): void {
        for (let x = point.x + 1; x < this.width; x++) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecYFrom(point: Point, cb: GridScanCallback<T>): void {
        for (let y = point.y - 1; y >= 0; y--) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncYFrom(point: Point, cb: GridScanCallback<T>): void {
        for (let y = point.y + 1; y < this.height; y++) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecXTo(point: Point, cb: GridScanCallback<T>): void {
        for (let x = this.width - 1; x > point.x; x--) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncXTo(point: Point, cb: GridScanCallback<T>): void {
        for (let x = 0; x < point.x; x++) {
            const p = new Point(x, point.y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecYTo(point: Point, cb: GridScanCallback<T>): void {
        for (let y = this.height - 1; y > point.y; y--) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncYTo(point: Point, cb: GridScanCallback<T>): void {
        for (let y = 0; y < point.y; y++) {
            const p = new Point(point.x, y);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanAdjacents(point: Point, diagonals: boolean, cb: GridScanCallback<T>): void {
        for (const p of this.adjacentTo(point, diagonals)) {
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }
}
