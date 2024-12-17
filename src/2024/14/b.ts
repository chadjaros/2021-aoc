import { aoc } from '../../ts-utils/aoc';
import { BoundingBox2, Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';

aoc((infile) => {
    const input = infile.lines
        .map((_) => {
            const parts = _.split(' ').flatMap((h) => h.split('=').flatMap((p) => p.split(',').map((v) => parseInt(v))));
            return { p: new Point(parts[1], parts[2]), v: new Point(parts[4], parts[5]) };
        });

    const box = new BoundingBox2(new Point(0, 0), new Point(100, 102));

    const iterate = () => {
        input.forEach((i) => {
            let newX = i.p.x + i.v.x;
            let newY = i.p.y + i.v.y;
            while (newX > box.max.x) {
                newX -= box.width;
            }
            while (newX < box.min.x) {
                newX += box.width;
            }
            while (newY > box.max.y) {
                newY -= box.height;
            }
            while (newY < box.min.y) {
                newY += box.height;
            }
            i.p = new Point(newX, newY);
        });
    };

    const findFill = (start: Point, filter: (point: Point) => boolean): Map<string, Point> => {
        const result = new Map<string, Point>();

        const queue = [start];

        while (queue.length > 0) {
            const next = queue.pop()!;
            if (filter(next)) {
                result.set(next.key, next);
                queue.push(...next.adjacents().filter((_) => !result.has(_.key)));
            }
        }

        return result;
    };

    const check = (): boolean => {

        const set = new Set(input.map((_) => _.p.key));

        return ![0, 1, 2].some((idx) => {
            return findFill(input[idx].p, (p) => set.has(p.key)).size >= 20;
        });
    };

    let value = 0;
    while (check()) {
        value++;
        iterate();
    }

    return { value };
});
