export interface Cardinals {
    readonly Up: Point;
    readonly Down: Point;
    readonly Left: Point;
    readonly Right: Point;
}

export class Point {

    static readonly Cardinals: Cardinals = {
        Up: new Point(0, -1),
        Down: new Point(0, 1),
        Right: new Point(1, 0),
        Left: new Point(-1, 0),
    };

    static adjacentDirs(diagonals = false): Point[] {
        const result = [
            this.Cardinals.Up, this.Cardinals.Down, this.Cardinals.Left, this.Cardinals.Right
        ];
        if (diagonals) {
            result.push(new Point(-1, -1));
            result.push(new Point(-1, 1));
            result.push(new Point(1, -1));
            result.push(new Point(1, 1));
        }
        return result;
    }

    static boundingBox(points: Point[]): { min: Point, max: Point; } {
        let minX = points[0].x;
        let minY = points[0].x;
        let maxX = points[0].y;
        let maxY = points[0].y;

        points.slice(1).forEach((p) => {
            if (p.x < minX) {
                minX = p.x;
            }
            else if (p.x > maxX) {
                maxX = p.x;
            }

            if (p.y < minY) {
                minY = p.y;
            }
            else if (p.y > maxY) {
                maxY = p.y;
            }
        });

        return {
            min: new Point(minX, minY),
            max: new Point(maxX, maxY),
        };
    }

    private _key: string | undefined = undefined;
    constructor(
        public x: number,
        public y: number
    ) { }


    static fromKey(s: string): Point {
        const x: number[] = s.split('-').map((n) => parseFloat(n));
        return new Point(x[0], x[1]);
    }

    get key(): string {
        if (this._key === undefined) {
            this._key = `${this.x}-${this.y}`;
        }
        return this._key;
    }

    adjacents(diagonals = false): Point[] {
        const result = [
            new Point(this.x - 1, this.y),
            new Point(this.x, this.y - 1),
            new Point(this.x + 1, this.y),
            new Point(this.x, this.y + 1),
        ];
        if (diagonals) {
            result.push(new Point(this.x - 1, this.y - 1));
            result.push(new Point(this.x - 1, this.y + 1));
            result.push(new Point(this.x + 1, this.y - 1));
            result.push(new Point(this.x + 1, this.y + 1));
        }
        return result;
    }

    minus(p: Point): Point {
        return new Point(this.x - p.x, this.y - p.y);
    }

    plus(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y);
    }

    times(n: number): Point {
        return new Point(this.x * n, this.y * n);
    }

    vectorTo(p: Point): Vector2 {
        return new Vector2(this.x - p.x, this.y - p.y);
    }

    get sum(): number {
        return this.x + this.y;
    }

    manhattanDistance(p: Point) {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }

    static minMax(points: Point[]): { min: Point; max: Point; } {
        let minX = points[0].x;
        let minY = points[0].y;
        let maxX = points[0].x;
        let maxY = points[0].y;

        for (const p of points) {
            if (p.x < minX) {
                minX = p.x;
            }
            if (p.y < minY) {
                minY = p.y;
            }
            if (p.x > maxX) {
                maxX = p.x;
            }
            if (p.y > maxY) {
                maxY = p.y;
            }
        }

        return { min: new Point(minX, minY), max: new Point(maxX, maxY) };
    }

    equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

export class Vector2 {
    constructor(
        public x: number,
        public y: number
    ) { }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    unit(): Vector2 {
        const mag = 1 / this.magnitude;
        return new Vector2(this.x * mag, this.y * mag);
    }
}
