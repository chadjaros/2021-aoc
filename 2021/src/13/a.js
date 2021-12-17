"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const points = input_1.input13Points;
const folds = input_1.input13Folds;
const d = (0, input_1.getDimensions)(points);
console.log();
let grid = [];
for (let y = 0; y <= d.height; y++) {
    const row = [];
    grid.push(row);
    for (let x = 0; x <= d.width; x++) {
        row.push(false);
    }
}
for (const p of points) {
    grid[p[1]][p[0]] = true;
}
for (const f of folds) {
    console.log(f);
    let nextGrid = [];
    if (f[0] === 'y') {
        const fold = f[0];
        nextGrid = grid.slice(0, f[1] - 1);
    }
    else {
        const fold = f[1];
        grid.forEach((row) => {
            for (let x = 1; x <= fold; x++) {
                if (row[x + fold]) {
                    row[fold - x] = true;
                }
            }
        });
        nextGrid = grid.map((x) => x.slice(0, fold));
    }
    console.log(grid[0].length, grid.length);
    console.log(nextGrid[0].length, nextGrid.length);
    grid = nextGrid;
    break;
}
(0, input_1.print)(grid);
let sum = 0;
grid.forEach((r) => r.filter((v) => v).forEach((v) => sum++));
console.log(sum, points.length);
//# sourceMappingURL=a.js.map