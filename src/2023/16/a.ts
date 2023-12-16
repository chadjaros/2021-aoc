import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

const Dirs = new Map([
    ['^', (p: Point) => p.minus(new Point(0, 1))],
    ['v', (p: Point) => p.plus(new Point(0, 1))],
    ['<', (p: Point) => p.minus(new Point(1, 0))],
    ['>', (p: Point) => p.plus(new Point(1, 0))],
]);

aoc((infile) => {
    const grid = infile.grid('', (_) => ({ char: _, beams: new Set<string>() }));

    const queue = [{ dir: '>', point: new Point(-1, 0) }];

    while (queue.length > 0) {

        const current = queue.pop()!;

        const nextPt = Dirs.get(current.dir)!(current.point);
        if (grid.isValid(nextPt)) {
            const nextVal = grid.getValue(nextPt);
            if (!nextVal.beams.has(current.dir)) {
                nextVal.beams.add(current.dir);

                if (nextVal.char === '.') {
                    queue.push({ dir: current.dir, point: nextPt });
                }
                else if (nextVal.char === '/') {
                    if (current.dir === '>') {
                        queue.push({ dir: '^', point: nextPt });
                    }
                    else if (current.dir === '<') {
                        queue.push({ dir: 'v', point: nextPt });
                    }
                    else if (current.dir === '^') {
                        queue.push({ dir: '>', point: nextPt });
                    }
                    else {
                        queue.push({ dir: '<', point: nextPt });
                    }
                }
                else if (nextVal.char === '\\') {
                    if (current.dir === '>') {
                        queue.push({ dir: 'v', point: nextPt });
                    }
                    else if (current.dir === '<') {
                        queue.push({ dir: '^', point: nextPt });
                    }
                    else if (current.dir === '^') {
                        queue.push({ dir: '<', point: nextPt });
                    }
                    else {
                        queue.push({ dir: '>', point: nextPt });
                    }
                }
                else if (nextVal.char === '-') {
                    if (current.dir === '>' || current.dir === '<') {
                        queue.push({ dir: current.dir, point: nextPt });
                    }
                    else {
                        queue.push({ dir: '<', point: nextPt });
                        queue.push({ dir: '>', point: nextPt });
                    }
                }
                else if (nextVal.char === '|') {
                    if (current.dir === 'v' || current.dir === '^') {
                        queue.push({ dir: current.dir, point: nextPt });
                    }
                    else {
                        queue.push({ dir: 'v', point: nextPt });
                        queue.push({ dir: '^', point: nextPt });
                    }
                }
            }
        }
    }

    grid.print((x) => x.beams.size === 0 ? '.' : '#');

    const value = grid.reduce((acc, v) => {
        return acc + (v.beams.size > 0 ? 1 : 0);
    }, 0);

    return { value };
});
