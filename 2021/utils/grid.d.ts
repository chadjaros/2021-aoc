import { Point } from './point';
export declare class Grid<T> {
    private values;
    constructor(values: T[][]);
    static fromSize<T>(width: number, height: number, defaultVal: T): Grid<T>;
    isValid(point: Point): boolean;
    getValue(point: Point): T;
    setValue(point: Point, value: T): T;
    get width(): number;
    get height(): number;
    forEach(cb: (value: T, point: Point) => void): void;
}
