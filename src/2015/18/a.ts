import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';
import { input18 } from './input';

let current = input18;
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
}

let count = 0;
current.forEach((v) => {
    count += (v ? 1 : 0);
});

console.log(count);
