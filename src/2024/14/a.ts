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

    for (let i = 0; i < 100; i++) {
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
    }

    const mid = new Point(box.max.x / 2, box.max.y / 2);
    const quads = [...Series.of(4, 0)];

    input.forEach((_) => {
        if (_.p.x < mid.x && _.p.y < mid.y) {
            quads[0]++;
        }
        else if (_.p.x < mid.x && _.p.y > mid.y) {
            quads[1]++;
        }
        else if (_.p.x > mid.x && _.p.y > mid.y) {
            quads[2]++;
        }
        else if (_.p.x > mid.x && _.p.y < mid.y) {
            quads[3]++;
        }
    });

    const value = quads.reduce((acc, v) => acc * v, 1);
    return { value };
});
