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

const grid = new Grid(values);

const start = new Point(0,0);

const end = new Point(grid.width - 1, grid.height - 1);

function cost(p: Point) {
    grid.getValue(p) + end.minus(p).sum;
}

function dijkstra() {

    let distances = new SortedList<[string, number]>((a, b) => a[1] - b[1]);
    const previous = new Map<string, Point>();

    const allPoints = new Map<string, Point>([[start.key, start]]);
    const explored = new Set<string>();

    distances.queue([start.key, 0]);
    const distanceMap = new Map(distances.values);

    while (allPoints.size > 0) {
        
        const current = distances.dequeue()!;

        // console.log('visiting', current);
        const point = allPoints.get(current[0])!;
        allPoints.delete(current[0]);

        if (current[0] === end.key) {
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
            if (alt < (distanceMap.get(neighbor.key) ?? Infinity)) {
                if (allPoints.has(neighbor.key)) {
                    distances.delete((x) => x[0] === neighbor.key);
                }
                distanceMap.set(neighbor.key, alt);
                distances.queue([neighbor.key, alt]);
                previous.set(neighbor.key, point);
            }
        }
    }

    return undefined;
}

const s = Date.now();

console.log(dijkstra(), Date.now() - s);