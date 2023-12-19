import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';

const regex = /(\w) (\d+) \(#(\w+)\)/;

aoc((infile) => {

    const start = new Point(0, 0);
    let current = start;

    const border = infile.lines
        .flatMap((value) => {

            const splits = value.match(regex)!;
            const dir = splits[1];
            const len = parseInt(splits[2]);
            const color = splits[3];

            let dirVec = Point.Cardinals.Up;
            if (dir === 'L') {
                dirVec = Point.Cardinals.Left;
            }
            else if (dir === 'R') {
                dirVec = Point.Cardinals.Right;
            }
            else if (dir === 'D') {
                dirVec = Point.Cardinals.Down;
            }

            return [...Series.until(0, len)].map(() => {
                current = current.plus(dirVec);

                return {
                    point: current,
                    color
                };
            });
        });

    const borderPoints = border.map((_) => _.point);

    const bbox = Point.boundingBox(borderPoints);
    const center = new Point(Math.floor((bbox.max.x + bbox.min.x) / 2), Math.floor((bbox.max.y + bbox.min.y) / 2));

    const fill = new Set(borderPoints.map((_) => _.key));
    const check = [center];

    while (check.length > 0) {
        const current = check.shift()!;
        if (fill.has(current.key)) {
            continue;
        }

        fill.add(current.key);

        const nexts = current.adjacents().filter((a) => !fill.has(a.key));
        check.push(...nexts);
    }

    const value = fill.size;

    return { value };
});
