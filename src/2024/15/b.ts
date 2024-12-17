import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { BoundingBox2, Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.string.split('\n\n');
    const grid = new Grid(input[0].split('\n').map((_) => _.split('').flatMap((v) => {
        if (v === '#') {
            return ['#', '#'];
        }
        else if (v === '.') {
            return ['.', '.'];
        }
        else if (v === 'O') {
            return ['[', ']'];
        }
        else if (v === '@') {
            return ['@', '.'];
        }
    })));
    const instructions = input[1].replaceAll('\n', '');

    const directions = new Map([
        ['^', (p: Point) => new Point(p.x, p.y - 1)],
        ['v', (p: Point) => new Point(p.x, p.y + 1)],
        ['<', (p: Point) => new Point(p.x - 1, p.y)],
        ['>', (p: Point) => new Point(p.x + 1, p.y)],
    ]);

    const boxPts = (p: Point) => [p, p.add(1, 0)];

    const stuff = grid.reduce((acc, v, p) => {
        if (v === '#') {
            acc.walls.add(p.key);
        }
        else if (v === '[') {
            boxPts(p).forEach((_) => acc.boxes.set(_.key, p));
        }
        else if (v === '@') {
            acc.pos = p;
        }

        return acc;
    }, { pos: new Point(0, 0), walls: new Set<string>(), boxes: new Map<string, Point>() });

    for (let i = 0; i < instructions.length; i++) {
        const dir = instructions[i];
        const inst = directions.get(dir)!;

        const next = inst(stuff.pos);
        if (stuff.walls.has(next.key)) {
            // nothing
        }
        else if (!stuff.boxes.has(next.key)) {
            stuff.pos = next;
        }
        else { // direction is a box
            const boxes = [stuff.boxes.get(next.key)!];
            let pushing = boxes;
            let breakit = false;
            let wall = false;
            while (!breakit) {
                if (dir === '>' || dir === '<') {
                    const boxend = boxes[boxes.length - 1];
                    let following = inst(boxend);
                    if (dir === '>') {
                        following = inst(following);
                    }

                    if (stuff.boxes.has(following.key)) {
                        boxes.push(stuff.boxes.get(following.key)!);
                    }
                    else {
                        wall = stuff.walls.has(following.key);
                        breakit = true;
                    }
                }
                else {
                    const pushingNext = new Map<string, Point>();
                    pushing.flatMap((_) => boxPts(_)).forEach((_) => {
                        const following = inst(_);
                        const bnext = stuff.boxes.get(following.key);
                        if (bnext) {
                            pushingNext.set(bnext.key, bnext);
                        }
                        else {
                            wall = wall || stuff.walls.has(following.key);
                        }
                    });
                    breakit = wall || pushingNext.size === 0;
                    pushing = [...pushingNext.values()];
                    boxes.push(...pushing);
                }
            }
            if (!wall) {
                stuff.pos = next;
                boxes.forEach((_) => {
                    boxPts(_).forEach((d) => stuff.boxes.delete(d.key));
                });
                boxes.forEach((_) => {
                    const bn = inst(_);
                    boxPts(bn).forEach((n) => stuff.boxes.set(n.key, bn));
                });
            }
        }
    }

    const value = [...new Map([...stuff.boxes.values()].map((_) => [_.key, _])).values()].reduce((acc, p) => acc + p.y * 100 + p.x, 0);
    return { value };
});
