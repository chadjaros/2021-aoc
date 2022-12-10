export class Point {

    private _key: string | undefined = undefined;
    constructor(
        public x: number,
        public y: number
    ) {
    }

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
            new Point(this.x-1, this.y),
            new Point(this.x+1, this.y),
            new Point(this.x, this.y-1),
            new Point(this.x, this.y+1),
        ];
        if (diagonals) {
            result.push(new Point(this.x-1, this.y-1));
            result.push(new Point(this.x-1, this.y+1));
            result.push(new Point(this.x+1, this.y-1));
            result.push(new Point(this.x+1, this.y+1));
        }
        return result;
    }

    minus(p: Point): Point {
        return new Point(this.x - p.x, this.y - p.y);
    }

    vectorTo(p: Point): Vector2 {
        return new Vector2(this.x - p.x, this.y - p.y);
    }

    get sum(): number {
        return this.x + this.y;
    }

}

export class Vector2 {
    constructor(
        public x: number,
        public y: number
    ) {
    }


    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    unit(): Vector2 {
        const mag = 1 / this.magnitude;
        return new Vector2(this.x * mag, this.y * mag);
    }
}
