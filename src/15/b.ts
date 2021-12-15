import { SortedList } from "../sortedlist";
import { Grid } from "../grid";
import { Point } from "../point";
import { input15 } from "./input";

const tile = input15;

const values: number[][] = [];

for (let y = 0; y < tile.height * 5; y++) {
    const row: number[] = [];
    values.push(row);
    for (let x = 0; x < tile.width * 5; x++) {
        const add = Math.floor(x / tile.width) + Math.floor(y / tile.height);
        const tileValue = tile.getValue(new Point(x % tile.width, y % tile.height));

        let newValue = (tileValue + add);
        while (newValue > 9) {
            newValue -= 9;
        }
        row.push(newValue);
    }
}

const grid = input15;

const start = new Point(0,0);

const end = new Point(grid.width - 1, grid.height - 1);

function cost(p: Point) {
    grid.getValue(p) + end.minus(p).sum;
}

function dijkstra() {

    const distances = new Map<string, number>();
    const queue = new SortedList<{s: string, n: number}>((a, b) => a.n - b.n);
    const previous = new Map<string, Point>();

    const allPoints = new Map<string, Point>([[start.key, start]]);
    const explored = new Set<string>();



    distances.set(start.key, 0);

    let revs = 0;
    while (allPoints.size > 0) {
        revs++;
        const current = [...distances]
            .filter(([p, n]) => allPoints.has(p))
            .sort(([ap, an], [bp, bn]) => an - bn)[0];

        // console.log('visiting', current);

        const point = allPoints.get(current[0])!;
        allPoints.delete(current[0]);

        if (current[0] === end.key) {
            console.log(revs);
            let sum = 0;
            let c = current[0];
            while(c && c != start.key) {
                sum += grid.getValue(Point.fromKey(c));
                c = previous.get(c)!.key;
            }
            return sum;
        }
        
        explored.add(point.key);

        const adjacents = point.adjacents().filter((x) => !explored.has(x.key) && grid.isValid(x));
        adjacents.forEach((x) => allPoints.set(x.key, x));
        for (const neighbor of adjacents) {
            const alt = current[1] + grid.getValue(neighbor);// + end.minus(neighbor).sum;
            if (alt < (distances.get(neighbor.key) ?? Infinity)) {
                distances.set(neighbor.key, alt);
                previous.set(neighbor.key, point);
            }
        }
    }

    return undefined;
}

dijkstra();

const s = Date.now();

console.log(dijkstra(), Date.now() - s);