import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { setEq } from '../../ts-utils/set-math';
import { Possible } from '../../ts-utils/util-types';

const edges = (p: Point, value: string): Point[] => {
    const result: Point[] = [];
    if (value === '|' || value === 'L' || value === 'J') {
        result.push(p.plus(new Point(0, -1)));
    }
    if (value === '|' || value === '7' || value === 'F') {
        result.push(p.plus(new Point(0, 1)));
    }
    if (value === '-' || value === 'L' || value === 'F') {
        result.push(p.plus(new Point(1, 0)));
    }
    if (value === '-' || value === '7' || value === 'J') {
        result.push(p.plus(new Point(-1, 0)));
    }
    return result;
};

aoc((infile) => {
    const grid = infile.grid('', (_) => _);

    const start = grid.find((value) => value === 'S')!;

    const startEdges = start.adjacents()
        .filter((x) => grid.isValid(x) && edges(x, grid.getValue(x)).some((y) => y.equals(start)));

    const startEdgeSet = new Set(startEdges.map((_) => _.key));
    const startReplacement = ['-', '|', 'F', 'L', '7', 'J'].find((v) => {
        return setEq(startEdgeSet, new Set(edges(start, v).map((_) => _.key)));
    })!;

    grid.setValue(start, startReplacement);

    const loopPoints = new Map<string, Point>([[start.key, start]]);
    let curr = startEdges[0];
    let last = start;
    while (!curr.equals(start)) {
        loopPoints.set(curr.key, curr);
        const next = edges(curr, grid.getValue(curr)).filter((p) => !p.equals(last))[0];
        last = curr;
        curr = next;
    }

    // points inside the loop will cross the loop an odd number of times
    const ins = grid.filter((_, point) => {
        if (loopPoints.has(point.key)) {
            return false;
        }

        let crosses = 0;

        let currEntry: Possible<string> = undefined;
        for (let x = point.x - 1; x >= 0; x--) {
            const p = new Point(x, point.y);
            if (!loopPoints.has(p.key)) {
                continue;
            }
            const char = grid.getValue(p);
            if (char === '|') {
                crosses++;
            }
            else if (char === 'J' || char === '7') {
                currEntry = char;
            }
            else if (char === 'F') {
                if (currEntry === 'J') {
                    crosses++;
                }
                currEntry = undefined;
            }
            else if (char === 'L') {
                if (currEntry === '7') {
                    crosses++;
                }
                currEntry = undefined;
            }
        }

        return crosses % 2 === 1;
    });

    return { value: ins.length };
});
