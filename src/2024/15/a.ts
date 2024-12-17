import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.string.split('\n\n');
    const grid = new Grid(input[0].split('\n').map((_) => _.split('')));
    const instructions = input[1].replaceAll('\n', '');

    const directions = new Map([
        ['^', (p: Point) => new Point(p.x, p.y - 1)],
        ['v', (p: Point) => new Point(p.x, p.y + 1)],
        ['<', (p: Point) => new Point(p.x - 1, p.y)],
        ['>', (p: Point) => new Point(p.x + 1, p.y)],
    ]);

    const stuff = grid.reduce((acc, v, p) => {
        if (v === '#') {
            acc.walls.add(p.key);
        }
        else if (v === 'O') {
            acc.boxes.set(p.key, p);
        }
        else if (v === '@') {
            acc.pos = p;
        }

        return acc;
    }, { pos: new Point(0, 0), walls: new Set<string>(), boxes: new Map<string, Point>() });

    for (let i = 0; i < instructions.length; i++) {
        const inst = directions.get(instructions[i])!;

        const next = inst(stuff.pos);
        if (stuff.walls.has(next.key)) {
            // nothing
        }
        else if (!stuff.boxes.has(next.key)) {
            stuff.pos = next;
        }
        else { // direction is a box
            let boxend = next;
            let breakit = false;
            let wall = false;
            while (!breakit) {
                const following = inst(boxend);
                if (stuff.boxes.has(following.key)) {
                    boxend = following;
                }
                else {
                    wall = stuff.walls.has(following.key);
                    breakit = true;
                }
            }
            if (!wall) {
                stuff.pos = next;
                stuff.boxes.delete(next.key);
                const nextBox = inst(boxend);
                stuff.boxes.set(nextBox.key, nextBox);
            }
        }
    }

    const value = [...stuff.boxes.values()].reduce((acc, p) => acc + p.y * 100 + p.x, 0);
    return { value };
});
