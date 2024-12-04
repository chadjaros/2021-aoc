import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const grid = infile.grid();

    const start = grid.find((_) => _ === 'S')!;

    const seen = new Map<string, number>();
    const next: [Point, number][] = [[start, 0]];
    const maxStep = 64;
    while (next.length > 0) {
        const [current, step] = next.pop()!;
        if (seen.has(current.key)) {
            continue;
        }
        seen.set(current.key, step);
        if (step < maxStep) {
            next.unshift(...current.adjacents()
                .filter((p) => !seen.has(p.key) && grid.isValid(p) && grid.getValue(p) === '.')
                .map<[Point, number]>((_) => [_, step + 1])
            );
        }
    }

    return { value: [...seen.values()].filter((_) => _ % 2 === maxStep % 2).length };
});
