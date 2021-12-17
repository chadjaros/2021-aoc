"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
const points = input_1.input13Points;
const folds = input_1.input13Folds;
const d = {
    height: folds.find((x) => x[0] === 'y')[1] * 2 + 1,
    width: folds.find((x) => x[0] === 'x')[1] * 2 + 1,
};
console.log(d);
let grid = [];
for (let y = 0; y < d.height; y++) {
    const row = [];
    grid.push(row);
    for (let x = 0; x < d.width; x++) {
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
        const fold = f[1];
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 1; y <= fold; y++) {
                if (grid[fold + y][x]) {
                    grid[fold - y][x] = true;
                }
            }
        }
        nextGrid = grid.slice(0, fold);
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
}
(0, input_1.print)(grid);
//# sourceMappingURL=b.js.map