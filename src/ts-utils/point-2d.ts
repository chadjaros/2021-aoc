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

    add(x: number, y: number) {
        return new Point(this.x + x, this.y + y);
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

export class BoundingBox2 {
    readonly min: Point;
    readonly max: Point;

    constructor(min: Point, max: Point) {
        this.min = min;
        this.max = max;
    }

    pointsIntersect(bb: BoundingBox2): boolean {
        return (
            Math.abs(
                this.min.x + this.innerWidth * 0.5 - (bb.min.x + bb.innerWidth * 0.5)
            ) * 2 <= this.innerWidth + bb.innerWidth
            &&
            Math.abs(
                this.min.y + this.innerHeight * 0.5 - (bb.min.y + bb.innerHeight * 0.5)
            ) * 2 <= this.innerHeight + bb.innerHeight
        );
    }

    intersects(bb: BoundingBox2): boolean {
        return (
            Math.abs(
                this.min.x + this.innerWidth * 0.5 - (bb.min.x + bb.innerWidth * 0.5)
            ) * 2 < this.innerWidth + bb.innerWidth
            &&
            Math.abs(
                this.min.y + this.innerHeight * 0.5 - (bb.min.y + bb.innerHeight * 0.5)
            ) * 2 < this.innerHeight + bb.innerHeight
        );
    }

    containsPoint(v: Point): boolean {
        return (
            v.x >= this.min.x &&
            v.x <= this.max.x &&
            v.y >= this.min.y &&
            v.y <= this.max.y
        );
    }

    private get innerHeight(): number {
        return this.max.y - this.min.y;
    }

    private get innerWidth(): number {
        return this.max.x - this.min.x;
    }

    get height(): number {
        return this.max.y - this.min.y + 1;
    }

    get width(): number {
        return this.max.x - this.min.x + 1;
    }


}
