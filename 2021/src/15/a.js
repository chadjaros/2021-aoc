"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("../../utils/point");
const input_1 = require("./input");
const grid = input_1.input15;
const start = new point_1.Point(0, 0);
const end = new point_1.Point(grid.width - 1, grid.height - 1);
function cost(p) {
    grid.getValue(p) + end.minus(p).sum;
}
function dijkstra() {
    var _a;
    const distances = new Map();
    const previous = new Map();
    const allPoints = new Map();
    grid.forEach((v, p) => allPoints.set(p.key, p));
    distances.set(start.key, 0);
    while (allPoints.size > 0) {
        const current = [...distances]
            .filter(([p, n]) => allPoints.has(p))
            .sort(([ap, an], [bp, bn]) => an - bn)[0];
        const point = allPoints.get(current[0]);
        allPoints.delete(current[0]);
        if (current[0] === end.key) {
            return current[1];
        }
        const adjacents = point.adjacents().filter((x) => allPoints.has(x.key));
        for (const neighbor of adjacents) {
            const alt = current[1] + grid.getValue(neighbor);
            if (alt < ((_a = distances.get(neighbor.key)) !== null && _a !== void 0 ? _a : Infinity)) {
                distances.set(neighbor.key, alt);
                previous.set(neighbor.key, point);
            }
        }
    }
    return undefined;
}
console.log(dijkstra());
//# sourceMappingURL=a.js.map