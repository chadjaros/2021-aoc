"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromKey(s) {
        const x = s.split('-').map((n) => parseFloat(n));
        return new Point(x[0], x[1]);
    }
    adjacents(diagonals = false) {
        return [
            new Point(this.x - 1, this.y),
            new Point(this.x + 1, this.y),
            new Point(this.x, this.y - 1),
            new Point(this.x, this.y + 1),
        ];
    }
    get key() {
        return `${this.x}-${this.y}`;
    }
    minus(p) {
        return new Point(this.x - p.x, this.y - p.y);
    }
    get sum() {
        return this.x + this.y;
    }
}
exports.Point = Point;
//# sourceMappingURL=point.js.map