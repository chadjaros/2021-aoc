export declare enum Direction {
    Forward = "forward",
    Down = "down",
    Up = "up"
}
export interface Vector {
    dir: Direction | string;
    distance: number;
}
export declare const input2: Vector[];
