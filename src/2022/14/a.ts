import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.splitLines(' -> ').map((line) =>
        line.map((x) => {
            const s = x.split(',');
            return new Point(parseInt(s[0]), parseInt(s[1]));
        })
    );

    let minPoint = new Point(500, 0);
    let maxPoint = new Point(500, 0);
    const rock = new Set<string>();

    for (const line of input) {
        for (let i = 0; i < line.length - 1; i++) {
            let start = line[i];
            let end = line[i + 1];
            if (line[i].x > line[i + 1].x || line[i].y > line[i + 1].y) {
                start = line[i + 1];
                end = line[i];
            }

            if (line[i].x !== line[i + 1].x) {
                if (minPoint.x > start.x) {
                    minPoint = new Point(start.x, minPoint.y);
                }
                if (maxPoint.x < end.x) {
                    maxPoint = new Point(end.x, maxPoint.y);
                }
                for (let x = start.x; x <= end.x; x++) {
                    const p = new Point(x, start.y);
                    rock.add(p.key);
                }
            } else {
                if (minPoint.y > start.y) {
                    minPoint = new Point(minPoint.x, start.y);
                }
                if (maxPoint.y < end.y) {
                    maxPoint = new Point(maxPoint.x, end.y);
                }
                for (let y = start.y; y <= end.y; y++) {
                    const p = new Point(start.x, y);
                    rock.add(p.key);
                }
            }
        }
    }
    const sand = new Set<string>();

    let exited = false;
    while (!exited) {
        let sandPoint = new Point(500, 0);
        let canMove = true;
        while (canMove) {
            if (
                sandPoint.x < minPoint.x ||
                sandPoint.x > maxPoint.x ||
                sandPoint.y > maxPoint.y
            ) {
                exited = true;
                canMove = false;
                continue;
            }
            const down = new Point(sandPoint.x, sandPoint.y + 1);
            if (!rock.has(down.key) && !sand.has(down.key)) {
                sandPoint = down;
                continue;
            }
            const downLeft = new Point(sandPoint.x - 1, sandPoint.y + 1);
            if (!rock.has(downLeft.key) && !sand.has(downLeft.key)) {
                sandPoint = downLeft;
                continue;
            }
            const downRight = new Point(sandPoint.x + 1, sandPoint.y + 1);
            if (!rock.has(downRight.key) && !sand.has(downRight.key)) {
                sandPoint = downRight;
                continue;
            }
            sand.add(sandPoint.key);
            canMove = false;
        }
    }

    return { value: sand.size };
});
