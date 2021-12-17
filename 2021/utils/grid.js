"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const point_1 = require("./point");
class Grid {
    constructor(values) {
        this.values = values.map((r) => [...r]);
    }
    static fromSize(width, height, defaultVal) {
        const v = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            v.push(row);
            for (let x = 0; x < width; x++) {
                row.push(defaultVal);
            }
        }
        return new Grid(v);
    }
    isValid(point) {
        return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
    }
    getValue(point) {
        return this.values[point.y][point.x];
    }
    setValue(point, value) {
        this.values[point.y][point.x] = value;
        return value;
    }
    get width() {
        return this.values[0].length;
    }
    get height() {
        return this.values.length;
    }
    forEach(cb) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const p = new point_1.Point(x, y);
                cb(this.getValue(p), p);
            }
        }
    }
}
exports.Grid = Grid;
//# sourceMappingURL=grid.js.map