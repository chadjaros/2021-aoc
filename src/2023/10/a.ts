import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

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
        .filter((x) => edges(x, grid.getValue(x)).some((y) => y.equals(start)));


    let loopLength = 1;
    let curr = startEdges[0];
    let last = start;
    while (!curr.equals(start)) {
        loopLength++;
        const next = edges(curr, grid.getValue(curr)).filter((p) => !p.equals(last))[0];
        last = curr;
        curr = next;
    }

    return { value: Math.ceil(loopLength / 2) };
});
