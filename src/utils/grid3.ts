import { Edge, Graph, Node } from './graph';
import { Point3 } from './point-3d';

export type Grid3ScanCallback<T> = (value: T, point: Point3) => boolean | void;
export type Grid3EdgeFunction<T> = (p: Point3, g: Grid3<T>) => Edge[];

export class Grid3Node<T> implements Node {
    constructor(
        public point: Point3,
        public grid: Grid3<T>,
        private edgefn: Grid3EdgeFunction<T>
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


export class Grid3<T> implements Graph<Grid3Node<T>>{
    
    private nodeCache: Map<string, Grid3Node<T>> = new Map();
    private values: T[][][];

    constructor(
        values: T[][][],
        private edgefn: Grid3EdgeFunction<T> = (p, g) => g.adjacentTo(p, false).map((p) => ({nodeId: p.key, weight: 1}))
    ) {
        this.values = values.map((r) => [...r.map((t) => [...t])]);
    }

    static fromSize<T>(width: number, height: number, depth: number, defaultVal: T, edgeFn?: Grid3EdgeFunction<T>): Grid3<T> {
        const v: T[][][] = [];
        for (let z = 0; z < depth; z++) {
            const plane: T[][] = [];
            v.push(plane);
            for (let y = 0; y < height; y++) {
                const row: T[] = [];
                plane.push(row);
                for (let x = 0; x < width; x++) {
                    row.push(defaultVal);
                }
            }
        }

        return new Grid3(v, edgeFn);
    }

    getNode(id: string): Grid3Node<T> {
        if (this.nodeCache.has(id)) {
            return this.nodeCache.get(id)!;
        }
        return this.nodeAt(Point3.fromKey(id));
    }

    nodeAt(p: Point3): Grid3Node<T> {
        if (this.nodeCache.has(p.key)) {
            return this.nodeCache.get(p.key)!;
        }
        if (this.isValid(p)) {
            const n = new Grid3Node(p, this, this.edgefn);
            this.nodeCache.set(n.id, n);
            return n;
        }
        throw new Error(`No grid node at '${p.key}'`);
    }

    isValid(point: Point3): boolean {
        return point.x >= 0 && point.y >= 0 && point.z >= 0 && point.x < this.width && point.y < this.height && point.z < this.depth;
    }

    isEdge(point: Point3): boolean {
        return point.x === 0 || point.y === 0 || point.z === 0 || point.x === this.width - 1 || point.y === this.height - 1 || point.z === this.depth - 1;
    }

    getValue(point: Point3): T {
        return this.values[point.z][point.y][point.x];
    }

    setValue(point: Point3, value: T): T {
        this.values[point.z][point.y][point.x] = value;
        return value;
    }

    get width(): number {
        return this.values[0][0].length;
    }

    get height(): number {
        return this.values[0].length;
    }
    
    get depth(): number {
        return this.values.length;
    }

    adjacentTo(p: Point3, diagonals: boolean): Point3[] {
        return p.adjacents(diagonals)
            .filter((p) => this.isValid(p));
    }

    forEach(cb: Grid3ScanCallback<T>): void {
        for(let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                for (let z = 0; z < this.depth; z++) {
                    const p = new Point3([x, y, z]);
                    if (cb(this.getValue(p), p)) {
                        return;
                    }
                }
            }
        }
    }

    scanDecXFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let x = point.x - 1; x >= 0; x--) {
            const p = new Point3([x, point.y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncXFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let x = point.x + 1; x < this.width; x++) {
            const p = new Point3([x, point.y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecYFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let y = point.y - 1; y >= 0; y--) {
            const p = new Point3([point.x, y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncYFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let y = point.y + 1; y < this.height; y++) {
            const p = new Point3([point.x, y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecZFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let z = point.z - 1; z >= 0; z--) {
            const p = new Point3([point.x, point.y, z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncZFrom(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let z = point.z + 1; z < this.depth; z++) {
            const p = new Point3([point.x, point.y, z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecXTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let x = this.width - 1; x > point.x; x--) {
            const p = new Point3([x, point.y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncXTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let x = 0; x < point.x; x++) {
            const p = new Point3([x, point.y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecYTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let y = this.height - 1; y > point.y; y--) {
            const p = new Point3([point.x, y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncYTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let y = 0; y < point.y; y++) {
            const p = new Point3([point.x, y, point.z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanDecZTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let z = this.depth - 1; z > point.z; z--) {
            const p = new Point3([point.x, point.y, z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanIncZTo(point: Point3, cb: Grid3ScanCallback<T>): void {
        for (let z = 0; z < point.z; z++) {
            const p = new Point3([point.x, point.y, z]);
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }

    scanAdjacents(point: Point3, diagonals: boolean, cb: Grid3ScanCallback<T>): void {
        for (const p of this.adjacentTo(point, diagonals)) {
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }
}
