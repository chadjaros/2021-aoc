import { Point } from '../5/input';
export declare class Cavern {
    private map;
    constructor(values: number[][]);
    get width(): number;
    get height(): number;
    get(p: Point): Location;
    forEach(cb: (p: Point) => void): void;
    pointIsValid(p: Point): boolean;
    print(): void;
    every(cb: (l: Location) => boolean): boolean;
}
export interface Location {
    value: number;
    flashed: boolean;
}
export declare function adjacents(point: Point): Point[];
export declare const input11: number[][];
export declare const input11mini: number[][];
