"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("../../utils/grid");
const point_1 = require("../../utils/point");
const input_1 = require("./input");
const ordered_map_1 = require("../../utils/ordered-map");
const tile = input_1.input15;
const values = [];
for (let y = 0; y < tile.height * 5; y++) {
    const row = [];
    values.push(row);
    for (let x = 0; x < tile.width * 5; x++) {
        const add = Math.floor(x / tile.width) + Math.floor(y / tile.height);
        const tileValue = tile.getValue(new point_1.Point(x % tile.width, y % tile.height));
        let newValue = (tileValue + add);
        while (newValue > 9) {
            newValue -= 9;
        }
        row.push(newValue);
    }
}
const grid = new grid_1.Grid(values);
const start = new point_1.Point(0, 0);
const end = new point_1.Point(grid.width - 1, grid.height - 1);
function dijkstra() {
    var _a;
    let distances = new ordered_map_1.OrderedMap((a, b) => a - b);
    const previous = new Map();
    const allPoints = new Map([[start.key, start]]);
    const explored = new Set();
    distances.set(start.key, 0);
    while (allPoints.size > 0) {
        const current = distances.popFront();
        // console.log('visiting', current);
        const point = allPoints.get(current[0]);
        allPoints.delete(current[0]);
        if (current[0] === end.key) {
            let sum = 0;
            let c = current[0];
            while (c && c != start.key) {
                sum += grid.getValue(point_1.Point.fromKey(c));
                c = previous.get(c).key;
            }
            return sum;
        }
        explored.add(point.key);
        const adjacents = point.adjacents().filter((x) => !explored.has(x.key) && grid.isValid(x));
        adjacents.forEach((x) => allPoints.set(x.key, x));
        for (const neighbor of adjacents) {
            const alt = current[1] + grid.getValue(neighbor);
            if (alt < ((_a = distances.get(neighbor.key)) !== null && _a !== void 0 ? _a : Infinity)) {
                if (allPoints.has(neighbor.key)) {
                    distances.delete(neighbor.key);
                }
                distances.set(neighbor.key, alt);
                previous.set(neighbor.key, point);
            }
        }
    }
    return undefined;
}
const s = Date.now();
console.log(dijkstra(), Date.now() - s);
//# sourceMappingURL=b.js.map