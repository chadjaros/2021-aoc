import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';
import { input18 } from './input';

let current = input18;

const corners = [
    new Point(0, 0),
    new Point(0, current.height - 1),
    new Point(current.width - 1, 0),
    new Point(current.width - 1, current.height - 1),
];

corners.forEach((p) => current.setValue(p, true));

let next = current;
for (const r of Series.range(1, 100)) {
    next = Grid.fromSize(current.width, current.height, false);

    current.forEach((value, point) => {
        const litNeighbors = point
            .adjacents(true)
            .filter((x) => current.isValid(x))
            .reduce((a, p) => {
                return a + (current.getValue(p) ? 1 : 0);
            }, 0);

        if (litNeighbors === 3 || (value && litNeighbors === 2)) {
            next.setValue(point, true);
        }
    });

    current = next;
    corners.forEach((p) => current.setValue(p, true));
}

let count = 0;
current.forEach((v) => { count += v ? 1 : 0; });

console.log(count);
