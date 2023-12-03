import { aoc } from '../../ts-utils/aoc';
import { dijkstra } from '../../ts-utils/find-path';
import { Edge, SimpleGraph } from '../../ts-utils/graph';

interface Location {
    id: string;
    flow: number;
    edges: Edge[];
}

aoc((infile) => {
    const input = infile.tokenLines.map((x) => {
        return {
            id: x[1],
            flow: parseInt(x[4].slice(0, -1).split('=')[1]),
            edges: x
                .slice(9)
                .join('')
                .split(',')
                .map((nodeId) => ({ nodeId, weight: 1 })),
        };
    });

    const locationGraph = new SimpleGraph(input);
    const location = locationGraph.getNode('AA');

    const withFlow = locationGraph.allNodes.filter(
        (x) => x.id === location.id || x.flow > 0
    );

    const locationPrecompute = new Map<string, Map<string, number>>();
    withFlow.forEach((l) => {
        locationPrecompute.set(
            l.id,
            new Map(
                Array.from(
                    dijkstra(l, locationGraph)!.distances.entries()
                ).filter(([id]) => locationGraph.getNode(id).flow > 0)
            )
        );
    });

    function dfs(
        location: Location,
        unopened: Set<string>,
        time: number,
        flow: number,
        total: number,
        log: string[]
    ): [number, string[]] {
        if (time === 0) {
            return [total, [...log, `t0 end flow ${flow} total ${total}`]];
        }

        if (location.flow !== 0 && unopened.has(location.id)) {
            const nextSet = new Set(unopened);
            nextSet.delete(location.id);
            return dfs(
                location,
                nextSet,
                time - 1,
                flow + location.flow,
                flow + total,
                [
                    ...log,
                    `t${time} open ${location.id} flow +${location.flow} flow ${flow} total ${total}`,
                ]
            );
        }

        const possibles = Array.from(unopened.values())
            .map((x) => ({
                id: x,
                distance: locationPrecompute.get(location.id)?.get(x) ?? time,
            }))
            .filter((x) => x.distance + 1 < time);

        if (possibles.length > 0) {
            return possibles.reduce(
                (acc, value) => {
                    const result = dfs(
                        locationGraph.getNode(value.id),
                        unopened,
                        time - value.distance,
                        flow,
                        total + value.distance * flow,
                        [
                            ...log,
                            `t${time} move ${value.distance} to ${value.id} flow ${flow} total ${total}`,
                        ]
                    );

                    return result[0] > acc[0] ? result : acc;
                },
                [-Infinity, ['start']]
            );
        }

        return dfs(location, unopened, 0, flow, total + flow * time, [
            ...log,
            `t${time} wait until end flow ${flow} total ${total}`,
        ]);
    }

    const result = dfs(location, new Set(withFlow.map((x) => x.id)), 30, 0, 0, [
        't30 start ' + location.id,
    ]);

    result[1].forEach((x) => console.log(x));

    return { value: result[0] };
});
