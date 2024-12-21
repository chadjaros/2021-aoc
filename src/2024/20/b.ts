import { aoc } from '../../ts-utils/aoc';
import { dijkstra, dijkstraSolution } from '../../ts-utils/find-path';

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

    console.log(start.key, end.key, def?.costToTarget);

    const noCheatLength = nocheatArray!.reduce((acc, v, idx) => {
        acc.set(v.id, idx);
        return acc;
    }, new Map<string, number>());

    const value = nocheatArray!.reduce((acc, current, ps) => {
        return acc + nocheatArray.filter((_) => {
            const manhat = _.point.manhattanDistance(current.point);

            return manhat <= 20 &&
                noCheatLength.get(_.point.key)! + manhat <= ps - 100;
        }
        ).length;
    }, 0);

    return { value };
});
