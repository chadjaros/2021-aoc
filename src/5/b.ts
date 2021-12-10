import { input5, Point } from './input';

function main() {
    const candidates = input5;

    const max: Point = {x: 0, y: 0};
    for (let c of candidates) {
        if (c.end.x > max.x) {
            max.x = c.end.x;
        }
        if (c.start.x > max.x) {
            max.x = c.start.x;
        }
        if (c.end.y > max.y) {
            max.y = c.end.y;
        }
        if (c.start.y > max.y) {
            max.y = c.start.y;
        }
    }

    console.log(max);

    const grid: number[][] = [];
    for (let x = 0; x <= max.x; x++) {
        grid.push([]);
        for (let y = 0; y <= max.y; y++) {
            grid[x].push(0)
        }
    }

    for (const c of candidates) {
        if (c.start.x === c.end.x) {
            const smallY = c.start.y < c.end.y ? c.start.y : c.end.y;
            const bigY = c.start.y > c.end.y ? c.start.y : c.end.y;
            for (let y = smallY; y <= bigY; y++) {
                grid[c.start.x][y]++;
            }
        }
        else if (c.start.y === c.end.y) {
            const smallX = c.start.x < c.end.x ? c.start.x : c.end.x;
            const bigX = c.start.x > c.end.x ? c.start.x : c.end.x;
            for (let x = smallX; x <= bigX; x++) {
                grid[x][c.start.y]++;
            }
        }
        else if ((c.start.x - c.end.x) / (c.start.y - c.end.y) > 0) {
            const smallY = c.start.y < c.end.y ? c.start.y : c.end.y;
            const smallX = c.start.x < c.end.x ? c.start.x : c.end.x;
            const bigX = c.start.x > c.end.x ? c.start.x : c.end.x;
            for (let x = smallX, y = smallY; x <= bigX; x++, y++) {
                grid[x][y]++;
            }
        }
        else {
            const bigY = c.start.y > c.end.y ? c.start.y : c.end.y;
            const smallX = c.start.x < c.end.x ? c.start.x : c.end.x;
            const bigX = c.start.x > c.end.x ? c.start.x : c.end.x;
            for (let x = smallX, y = bigY; x <= bigX; x++, y--) {
                grid[x][y]++;
            }
        }
    }

    let count = 0;
    for (const line of grid) {
        for (const y of line) {
            if (y >= 2) {
                count++;
            }
        }
    }

    console.log(count);
}

main();
