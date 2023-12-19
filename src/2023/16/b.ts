import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';

const Dirs = new Map([
    ['^', (p: Point) => p.minus(new Point(0, 1))],
    ['v', (p: Point) => p.plus(new Point(0, 1))],
    ['<', (p: Point) => p.minus(new Point(1, 0))],
    ['>', (p: Point) => p.plus(new Point(1, 0))],
]);

function test(startGrid: Grid<{ char: string; beams: Set<string>; }>, start: { dir: string; point: Point; }): number {

    const grid = startGrid.clone((v) => ({ char: v.char, beams: new Set(v.beams) }));
    const queue = [start];

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

    return grid.reduce((acc, v) => {
        return acc + (v.beams.size > 0 ? 1 : 0);
    }, 0);
}

aoc((infile) => {
    const grid = infile.grid('', (_) => ({ char: _, beams: new Set<string>() }));


    const value = [
        ...Array.from(Series.until(0, grid.width)).flatMap((n) => {
            return [
                { dir: 'v', point: new Point(n, -1) },
                { dir: '^', point: new Point(n, grid.height) },
            ];
        }),
        ...Array.from(Series.until(0, grid.height)).flatMap((n) => {
            return [
                { dir: '>', point: new Point(-1, n) },
                { dir: '<', point: new Point(grid.width, n) },
            ];
        })
    ].reduce((acc, start) => {
        return Math.max(acc, test(grid, start));
    }, 0);

    return { value };
});
