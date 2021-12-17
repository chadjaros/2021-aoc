export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static fromKey(s: string): Point;
    adjacents(diagonals?: boolean): Point[];
    get key(): string;
    minus(p: Point): Point;
    get sum(): number;
}
