import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';

aoc(infile => {

    let elves = new Map<string, Point>();

    infile
        // .sample()
        .splitLines('').forEach((line, y) => {
            line.forEach((char, x) => {
                if (char === '#') {
                    const p = new Point(x, y);
                    elves.set(p.key, p);
                }
            });
        });

    const directions = [
        {
            dir: 'N',
            canMove: (point: Point, blocked: Point[]): boolean => {
                return blocked.every((p) => p.y !== point.y - 1);
            },
            proposal: (point: Point): Point => {
                return new Point(point.x, point.y-1);
            }
        },
        {
            dir: 'S',
            canMove: (point: Point, blocked: Point[]): boolean => {
                return blocked.every((p) => p.y !== point.y + 1);
            },
            proposal: (point: Point): Point => {
                return new Point(point.x, point.y+1);
            }
        },
        {
            dir: 'W',
            canMove: (point: Point, blocked: Point[]): boolean => {
                return blocked.every((p) => p.x !== point.x - 1);
            },
            proposal: (point: Point): Point => {
                return new Point(point.x-1, point.y);
            }
        },
        {
            dir: 'E',
            canMove: (point: Point, blocked: Point[]): boolean => {
                return blocked.every((p) => p.x !== point.x + 1);
            },
            proposal: (point: Point): Point => {
                return new Point(point.x+1, point.y);
            }
        },
    ];

    let round = 0;
    let moved = true;
    while (moved) {
        moved = false;
        round++;

        const proposals = new Map<string, {from: Point, to: Point}[]>();
        const next = new Map<string, Point>();

        for (const [id, point] of elves) {
            const adjacentHits = point.adjacents(true).filter((p) => elves.has(p.key));

            if (adjacentHits.length === 0) {
                next.set(point.key, point);
            }
            else {
                const dir = directions.find((d) => d.canMove(point, adjacentHits));
                if (dir) {
                    const prop = dir.proposal(point);
                    proposals.set(prop.key, [...(proposals.get(prop.key) ?? []), {from: point, to: prop}]);
                }
                else {
                    next.set(point.key, point);
                }
            }
        }

        for (const [key, value] of proposals) {
            if (value.length === 1) {
                next.set(key, value[0].to);
                moved = true;
            }
            else {
                value.forEach((v) => next.set(v.from.key, v.from));
            }
        }

        directions.push(directions.shift()!);
        elves = next;
    }

    return {value: round};
});