import { aoc } from '../../ts-utils/aoc';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';

aoc((infile) => {
    const grid = infile.grid('', (_) => _);

    const galaxies = grid.filter((v) => v === '#');

    const xSet = new Set(Series.range(0, grid.width - 1));
    const ySet = new Set(Series.range(0, grid.height - 1));

    galaxies.forEach((g) => {
        xSet.delete(g.x);
        ySet.delete(g.y);
    });

    const xExpand = Array.from(xSet).sort((a, b) => a - b);
    const yExpand = Array.from(ySet).sort((a, b) => a - b);

    const combinations: Point[][] = [];
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            combinations.push([galaxies[i], galaxies[j]]);
        }
    }

    const expandRate = 1000000 - 1;

    const distance = (a: Point, b: Point): number => {
        const minX = Math.min(...[a, b].map((_) => _.x));
        const maxX = Math.max(...[a, b].map((_) => _.x));
        const minY = Math.min(...[a, b].map((_) => _.y));
        const maxY = Math.max(...[a, b].map((_) => _.y));

        const xExpands = xExpand.filter((v) => v > minX && v < maxX).length;
        const yExpands = yExpand.filter((v) => v > minY && v < maxY).length;

        return a.manhattanDistance(b) + xExpands * expandRate + yExpands * expandRate;
    };

    const value = combinations.reduce((acc, combo) => {
        return acc + distance(combo[0], combo[1]);
    }, 0);

    return { value };
});
