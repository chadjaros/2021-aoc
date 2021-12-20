import { Point } from './point-2d';

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

    forEach(cb: (value: T, point: Point) => void): void {
        for(let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new Point(x, y);
                cb(this.getValue(p), p);
            }
        }
    }
}
