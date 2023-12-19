import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';

const regex = /(\w) (\d+) \(#(\w+)\)/;

aoc((infile) => {

    const start = new Point(0, 0);
    let current = start;

    const border = infile.lines
        .map((value) => {

            const splits = value.match(regex)!;
            const color = splits[3];


            const dir = color[5];
            const len = parseInt(color.substring(0, color.length - 1), 16);

            let dirVec = Point.Cardinals.Up;
            if (dir === '2') {
                dirVec = Point.Cardinals.Left;
            }
            else if (dir === '0') {
                dirVec = Point.Cardinals.Right;
            }
            else if (dir === '1') {
                dirVec = Point.Cardinals.Down;
            }

            const last = current;
            current = current.plus(dirVec.times(len));

            return {
                from: last,
                to: current,
                len
            };

        });

    const value = .5 * border.reduce((acc, v) => acc + v.len, 0) + 1 + border.reduce((acc, v) => {
        return acc + .5 * (v.from.x * v.to.y - v.to.x * v.from.y);
    }, 0);

    return { value };
});
