import { input9, input9mini } from './input';

interface Point {
    x: number;
    y: number;
}

function getAdjacents(point: Point): Point[] {
    const x = point.x;
    const y = point.y;

    return [
        {x, y: y-1},
        {x, y: y+1},
        {x: x-1, y},
        {x: x+1, y},
    ];
}
function isValid(point: Point, map: number[][]): boolean {
    return point.x >= 0 && point.y >= 0 && point.x < map[0].length && point.y < map.length;
}

function height(point: Point, map: number[][]): number {
    return map[point.y][point.x];
}

function hasVisited(point: Point, visited: Point[]): boolean {
    return visited.some((p) => p.x === point.x && p.y === point.y);
}

function findBasin(point: Point, map: number[][], visited: Point[] = []): Point[] {

    if (hasVisited(point, visited)) {
        return [];
    }

    /// Locations of Height 9 do not count as belonging in any basin
    if (height(point, map) >= 9) {
        return [];
    }

    const h = height(point, map);

    const adjacents: Point[] = getAdjacents(point);

    if (!adjacents.some((p) => hasVisited(p, visited) || (isValid(p, map) && h < height(p, map)))) {
        return [];
    }

    visited.push(point);

    return [
        point,
        ...adjacents.filter((p) => isValid(p, map))
            .reduce<Point[]>((accum, p) => {
                return [...accum, ...findBasin(p, map, visited)];
            }, [])];
}

function printBasin(basin: Point[], map: number[][]): void {
    const section = basin.reduce((v, p) => {
        return {
            minX: p.x < v.minX ? p.x : v.minX,
            minY: p.y < v.minY ? p.y : v.minY,
            maxX: p.x > v.maxX ? p.x : v.maxX,
            maxY: p.y > v.maxY ? p.y : v.maxY,
        };
    }, {minX: map[0].length, minY: map.length, maxX: 0, maxY: 0});

    console.log(section);
    const vis: string[][] = [];
    for (let x = section.minX; x < section.maxX; x++) {
        const row: string[] = [];
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
    const map = input9;

    let basins: Point[][] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const h = map[y][x];

            const isLowPoint = getAdjacents({ x, y }).every((p) => isValid(p, map) ? h < height(p, map) : h < 9 )
            if (isLowPoint) {
                const basin = findBasin({x, y}, map);
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
