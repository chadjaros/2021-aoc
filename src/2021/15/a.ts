import { Grid } from '../../utils/grid';
import { Point } from '../../utils/point';
import { input15 } from './input';

const grid = input15;

const start = new Point(0,0);

const end = new Point(grid.width - 1, grid.height - 1);

function cost(p: Point) {
    grid.getValue(p) + end.minus(p).sum;
}

function dijkstra() {

    const distances = new Map<string, number>();
    const previous = new Map<string, Point>();

    const allPoints = new Map<string, Point>();
    grid.forEach((v, p) => allPoints.set(p.key, p));

    distances.set(start.key, 0);

    while (allPoints.size > 0) {
        
        const current = [...distances]
            .filter(([p, n]) => allPoints.has(p))
            .sort(([ap, an], [bp, bn]) => an - bn)[0];

        const point = allPoints.get(current[0])!;
        allPoints.delete(current[0]);

        if (current[0] === end.key) {
            return current[1];
        }

        const adjacents = point.adjacents().filter((x) => allPoints.has(x.key));
        for (const neighbor of adjacents) {
            const alt = current[1] + grid.getValue(neighbor);
            if (alt < (distances.get(neighbor.key) ?? Infinity)) {
                distances.set(neighbor.key, alt);
                previous.set(neighbor.key, point);
            }
        }
    }

    return undefined;
}

console.log(dijkstra());