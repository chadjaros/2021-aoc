import { Point } from './point-2d';

export type GridScanCallback<T> = (value: T, point: Point) => boolean | void;
export class Grid<T> {
    private values: T[][];

    constructor(values: T[][]) {
        this.values = values.map((r) => [...r]);
    }

    static fromSize<T>(width: number, height: number, defaultVal: T): Grid<T> {
        const v: T[][] = [];
        for (let y = 0; y < height; y++) {
            const row: T[] = [];
            v.push(row);
            for (let x = 0; x < width; x++) {
                row.push(defaultVal);
            }
        }

        return new Grid(v);
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
        for (const p of point.adjacents(diagonals)
            .filter((p) => this.isValid(p))) {
            if (cb(this.getValue(p), p)) {
                return;
            }
        }
    }
}
