"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("./input");
function getAdjacents(point) {
    const x = point.x;
    const y = point.y;
    return [
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x: x + 1, y },
    ];
}
function isValid(point, map) {
    return point.x >= 0 && point.y >= 0 && point.x < map[0].length && point.y < map.length;
}
function height(point, map) {
    return map[point.y][point.x];
}
function hasVisited(point, visited) {
    return visited.some((p) => p.x === point.x && p.y === point.y);
}
function findBasin(point, map, visited = []) {
    if (hasVisited(point, visited)) {
        return [];
    }
    /// Locations of Height 9 do not count as belonging in any basin
    if (height(point, map) >= 9) {
        return [];
    }
    const h = height(point, map);
    const adjacents = getAdjacents(point);
    if (!adjacents.some((p) => hasVisited(p, visited) || (isValid(p, map) && h < height(p, map)))) {
        return [];
    }
    visited.push(point);
    return [
        point,
        ...adjacents.filter((p) => isValid(p, map))
            .reduce((accum, p) => {
            return [...accum, ...findBasin(p, map, visited)];
        }, [])
    ];
}
function printBasin(basin, map) {
    const section = basin.reduce((v, p) => {
        return {
            minX: p.x < v.minX ? p.x : v.minX,
            minY: p.y < v.minY ? p.y : v.minY,
            maxX: p.x > v.maxX ? p.x : v.maxX,
            maxY: p.y > v.maxY ? p.y : v.maxY,
        };
    }, { minX: map[0].length, minY: map.length, maxX: 0, maxY: 0 });
    console.log(section);
    const vis = [];
    for (let x = section.minX; x < section.maxX; x++) {
        const row = [];
        vis.push(row);
        for (let y = section.minY; y < section.maxY; y++) {
            row.push(' ');
        }
    }
    for (const point of basin) {
        vis[point.y - section.minY][point.x - section.minX] = `${height(point, map)}`;
    }
    for (const x of vis) {
        console.log(x.join(''));
    }
}
function main() {
    const map = input_1.input9;
    let basins = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const h = map[y][x];
            const isLowPoint = getAdjacents({ x, y }).every((p) => isValid(p, map) ? h < height(p, map) : h < 9);
            if (isLowPoint) {
                const basin = findBasin({ x, y }, map);
                basins.push(basin);
                // console.log('basin', x, y, height, basin.length, basin);
            }
        }
    }
    basins.sort((a, b) => { return b.length - a.length; });
    const sum = basins[0].length * basins[1].length * basins[2].length;
    console.log(sum, basins[0].length, basins[1].length, basins[2].length);
    printBasin(basins[0], map);
}
main();
//# sourceMappingURL=b.js.map