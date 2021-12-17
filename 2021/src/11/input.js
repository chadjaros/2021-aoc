"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input11mini = exports.input11 = exports.adjacents = exports.Cavern = void 0;
class Cavern {
    constructor(values) {
        this.map = values.map((line) => line.map((value) => ({ value, flashed: false })));
    }
    get width() {
        return this.map[0].length;
    }
    get height() {
        return this.map.length;
    }
    get(p) {
        return this.map[p.y][p.x];
    }
    forEach(cb) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                cb({ x, y });
            }
        }
    }
    pointIsValid(p) {
        return p.x >= 0 && p.y >= 0 && p.x < this.width && p.y < this.height;
    }
    print() {
        for (const row of this.map) {
            console.log(row.map((l) => l.value).join(''));
        }
    }
    every(cb) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (!cb(this.get({ x, y }))) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.Cavern = Cavern;
function adjacents(point) {
    const x = point.x;
    const y = point.y;
    return [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
    ];
}
exports.adjacents = adjacents;
exports.input11 = [
    [4, 6, 5, 8, 1, 3, 7, 6, 3, 7,],
    [3, 2, 7, 7, 8, 7, 4, 3, 5, 5,],
    [4, 5, 2, 5, 6, 1, 1, 1, 8, 3,],
    [3, 1, 2, 8, 1, 2, 5, 8, 8, 8,],
    [8, 7, 3, 4, 8, 3, 2, 8, 3, 8,],
    [4, 1, 7, 5, 4, 6, 3, 2, 5, 7,],
    [8, 3, 2, 1, 4, 2, 3, 5, 5, 2,],
    [4, 8, 3, 2, 1, 4, 5, 2, 5, 3,],
    [8, 2, 8, 6, 8, 3, 4, 8, 5, 1,],
    [4, 8, 8, 5, 3, 2, 3, 1, 3, 8,],
];
exports.input11mini = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3,],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1,],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3,],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6,],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8,],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5,],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1,],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4,],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4,],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6,],
];
//# sourceMappingURL=input.js.map