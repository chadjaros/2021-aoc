import { aoc } from '../../ts-utils/aoc';
import { dijkstra, dijkstraSolution } from '../../ts-utils/find-path';
import { Point } from '../../ts-utils/point-2d';

aoc((infile) => {
    const input = infile.grid(
        undefined,
        undefined,
        (p, g) => p.adjacents()
            .filter((_) => g.getValue(_) !== '#')
            .map((_) => ({ nodeId: _.key, weight: 1 }))
    );

    const start = input.find((_) => _ === 'S')!;
    const end = input.find((_) => _ === 'E')!;

    const def = dijkstra(input.nodeAt(start), input, (n) => n.point.key === end.key);
    const nocheatArray = dijkstraSolution(def)!;

    const noCheatLength = nocheatArray!.reduce((acc, v, idx) => {
        acc.set(v.id, idx);
        return acc;
    }, new Map<string, number>());


    type Entry = {
        point: Point;
        attempts: number;
        skips: number;
        ps: number;
        seen: Set<string>;
    };


    const nextPoints = ({ point, attempts, skips, ps, seen = new Set<string>() }: Entry): Entry[] => {
        if (point.key === end.key) {
            return [];
        }
        if (attempts === 0 && skips === 0) {
            return [];
        }

        const nextSeen = new Set([...seen, point.key]);
        return point.adjacents().reduce((acc, _) => {
            if (seen.has(_.key) || !input.isValid(_)) {
                // nothing
            }
            else if (input.getValue(_) === '#') {
                if (attempts === 1) {
                    acc.push({ point: _, attempts: 0, skips: 1, ps: ps + 1, seen: nextSeen });
                }
            }
            else {
                acc.push({ point: _, attempts, skips: 0, ps: ps + 1, seen: nextSeen });
            }
            return acc;
        }, new Array<Entry>());
    };

    const stack: Entry[] = [{ point: start, attempts: 1, skips: 0, ps: 0, seen: new Set<string>() }];
    let value = 0;
    while (stack.length > 0) {
        const current = stack.shift()!;

        if (current.ps <= noCheatLength.get(current.point.key)! - 100) {
            value++;
        }

        if (current.ps < def!.costToTarget! - 100) {
            stack.push(...nextPoints(current));
        }
    }

    return { value };
});
