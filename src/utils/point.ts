export class Point {
    constructor(
        public x: number,
        public y: number
    ) {
    }

    static fromKey(s: string): Point {
        const x: number[] = s.split('-').map((n) => parseFloat(n));
        return new Point(x[0], x[1]);
    }
    
    adjacents(diagonals = false): Point[] {
        return [
            new Point(this.x-1, this.y),
            new Point(this.x+1, this.y),
            new Point(this.x, this.y-1),
            new Point(this.x, this.y+1),
        ];
    }

    get key(): string {
        return `${this.x}-${this.y}`;
    }

    minus(p: Point): Point {
        return new Point(this.x - p.x, this.y - p.y);
    }

    get sum(): number {
        return this.x + this.y;
    }
}
