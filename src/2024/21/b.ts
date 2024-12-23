import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.lines;

    const numpad = new Grid([
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        ['.', '0', 'A'],
    ]).reduce((acc, v, p) => {
        acc.set(v, p);
        return acc;
    }, new Map<string, Point>());

    const dirpad = new Grid([
        ['.', new Point(0, -1).key, 'A'],
        [new Point(-1, 0).key, new Point(0, 1).key, new Point(1, 0).key]
    ]).reduce((acc, v, p) => {
        acc.set(v, p);
        return acc;
    }, new Map<string, Point>());

    const manhat = (p: Point) => {
        return Math.abs(p.x) + Math.abs(p.y);
    };

    const padNav = (map: Map<string, Point>, from: string, to: string): Point => {
        return map.get(to)!.minus(map.get(from)!);
    };

    let cache = new Map<string, number>();

    const recur = (
        depth: number,
        pad: Map<string, Point>,
        from: string,
        dir: Point,
        ct: number,
        routeMaker: (vectors: [string, number][], pad: Map<string, Point>, from: string, dir: Point) => [string, number][]
    ): number => {

        if (depth === 0) {
            return manhat(dir) + ct;
        }

        const unit = dir.unit();
        const vectors: [string, number][] = [];
        if (unit.x !== 0) {
            vectors.push([new Point(unit.x, 0).key, Math.abs(dir.x)]);
        }
        if (unit.y !== 0) {
            vectors.push([new Point(0, unit.y).key, Math.abs(dir.y)]);
        }

        const dests: [string, number][] = routeMaker(vectors, pad, from, dir);
        dests.push(['A', ct]);

        let navcursor = 'A';

        const cacheKey = `${depth}|${pad.get('.')?.key}|${from}>${dir.key}|${dests[0][0]}|${ct}`;
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey)!;
        }

        const val = dests.reduce((acc, _) => {
            const val = recur(depth - 1, dirpad, navcursor, padNav(dirpad, navcursor, _[0]), _[1], routeMaker);
            navcursor = _[0];
            return acc + val;
        }, 0);

        if (cache.has(cacheKey) && cache.get(cacheKey)! !== val) {
            console.log(cacheKey, cache.get(cacheKey), val);
        }
        cache.set(cacheKey, val);

        return val;
    };

    const precalcPoints = [
        new Point(-1, -1),
        new Point(-1, 1),
        new Point(1, -1),
        new Point(1, 1),
    ];

    const precalcRoute = (xFirst: boolean) => {
        return (vectors: [string, number][]) => {
            let route: [string, number][] = [];
            if (vectors.length > 1 && !xFirst) {
                route = [vectors[1], vectors[0]];
            }
            else {
                route = vectors;
            }
            return route;
        };
    };

    const precalcs = new Map(precalcPoints.map((_) => {
        const xFirst = recur(2, dirpad, 'A', _, 1, precalcRoute(true));
        const yFirst = recur(2, dirpad, 'A', _, 1, precalcRoute(false));
        return [_.key, xFirst < yFirst];
    }));


    const regularRoute = (vectors: [string, number][], pad: Map<string, Point>, from: string, dir: Point): [string, number][] => {
        const route: [string, number][] = [...vectors];
        if (vectors.length > 1) {
            const dot = pad.get('.')!;
            const xConflict = pad.get(from)!.plus(new Point(dir.x, 0)).equals(dot);
            const yConflict = pad.get(from)!.plus(new Point(0, dir.y)).equals(dot);
            const xFirst = precalcs.get(dir.unit().key)!;
            if (!xConflict && (yConflict || xFirst)) {
                // route = vectors;
            }
            else {
                route.reverse();
            }
        }

        return route;
    };

    const count = (s: string): number => {
        cache = new Map<string, number>();

        let value = 0;

        let numcursor = 'A';
        for (let idx = 0; idx < s.length; idx++) {
            const numTarget = s[idx];

            const numdir = padNav(numpad, numcursor, numTarget);
            value += recur(25, numpad, numcursor, numdir, 1, regularRoute);

            numcursor = numTarget;
        }
        console.log(s, value);
        return value;
    };

    const value = input.reduce((acc, _) => acc + (count(_) * parseInt(_.slice(0, -1))), 0);
    return { value };
});

const x3 = '^<';
const x2 = '<A v<A >>^A';
const x = 'v<<A>>^A v<A<A>>^A vAA<^A>A';

const y3 = '<^';
const y2 = 'v<<A >^A >A';
const y = '<vA<AA>>^A vA<^A>A vA^A';