import { readFileSync } from 'fs';
import { aoc } from '../../ts-utils/aoc';
import { dijkstra } from '../../ts-utils/find-path';
import { Edge, SimpleGraph } from '../../ts-utils/graph';
import { difference } from '../../ts-utils/set-math';

interface Location {
    id: string;
    flow: number;
    edges: Edge[];
}

interface Action {
    action: string;
    completesAt: number;
}

aoc((infile) => {
    const input = infile// .sample()
        .tokenLines
        .map((x) => {
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
    const start = locationGraph.getNode('AA');

    const withFlow = locationGraph.allNodes
        .filter((x) => x.flow > 0)
        .sort((a, b) => b.flow - a.flow);

    const locationPrecompute = new Map<string, Map<string, number>>();
    locationGraph.allNodes
        .filter((x) => x.id === start.id || x.flow > 0)
        .forEach((l) => {
            locationPrecompute.set(
                l.id,
                new Map(
                    Array.from(
                        dijkstra(l, locationGraph)!.distances.entries()
                    ).filter(([id]) => locationGraph.getNode(id).flow > 0)
                )
            );
        });

    const Me = 'me';
    const Ele = 'ele';
    const flowSet = new Set(withFlow.map((x) => x.id));

    let max = 0;
    let leaves = 0;
    function dfs(
        locations: Map<string, Location>,
        actions: Map<string, Action>,
        available: Set<string>,
        unopened: Set<string>,
        time: number,
        flow: number,
        total: number,
        log: string[]
    ): [number, string[]] {
        if (time === 0) {
            leaves++;
            if (total > max) {
                max = total;
                console.log(max, leaves);
            }
            return [total, [...log, `t0 end flow ${flow} total ${total}`]];
        }

        if (unopened.size === 0) {
            return dfs(
                locations,
                actions,
                available,
                unopened,
                0,
                flow,
                total + flow * time,
                [...log, `t${time} ffwd to end`]
            );
        }

        const newUnopened = new Set(unopened);
        let newFlow = flow;
        const newLog = [...log];
        const acted = new Map(
            [Me, Ele].map((m) => [
                m,
                (actions.get(m)?.completesAt ?? time) < time,
            ])
        );

        newLog.push(
            `--- m${27 - time} --- open: ${Array.from(
                difference(flowSet, unopened).values()
            ).join(',')} flow ${flow} total ${total}`
        );

        function processOpen(person: string): void {
            if (acted.get(person)) {
                return;
            }

            const location = locations.get(person)!;
            if (location.flow !== 0 && unopened.has(location.id)) {
                newFlow += location.flow;
                newUnopened.delete(location.id);
                newLog.push(
                    `t${time} ${person} open ${location.id} flow +${location.flow}`
                );
                acted.set(person, true);
            }
        }

        processOpen(Me);
        processOpen(Ele);

        const toMove = Array.from(acted.entries()).filter(([id, b]) => !b);

        if (toMove.length > 0) {
            const person = toMove[0][0];
            const location = locations.get(person)!;

            const possibles = Array.from(available.values())
                .map((x) => ({
                    id: x,
                    distance:
                        locationPrecompute.get(location.id)?.get(x) ?? time,
                }))
                .filter((x) => x.distance + 1 < time);

            if (possibles.length > 0) {
                const specialCaseAvailable = new Set(available);
                const isSpecialCase =
                    locations.get(Me)?.id === locations.get(Ele)?.id;
                if (isSpecialCase) {
                    console.log('specialCase', time, locations.get(Me)?.id);
                }

                return possibles.reduce(
                    (acc, value, idx) => {
                        specialCaseAvailable.delete(value.id);

                        const newAvailable = new Set(available);
                        const newActions = new Map(actions);
                        const newLocations = new Map(locations);
                        newAvailable.delete(value.id);
                        newLocations.set(
                            person,
                            locationGraph.getNode(value.id)
                        );
                        newActions.set(person, {
                            action: 'move',
                            completesAt: time - value.distance,
                        });
                        const moveLog = [
                            ...newLog,
                            `t${time} ${person} move ${value.distance} to ${value.id}`,
                        ];

                        if (toMove.length === 2) {
                            const person2 = toMove[1][0];
                            const location2 = locations.get(person2)!;

                            const poss2Src = isSpecialCase
                                ? specialCaseAvailable
                                : newAvailable;

                            if (isSpecialCase) {
                                console.log(
                                    'reduce',
                                    Array.from(newAvailable.values()).join(','),
                                    'to',
                                    Array.from(
                                        specialCaseAvailable.values()
                                    ).join(',')
                                );
                            }

                            const possibles2 = Array.from(poss2Src.values())
                                .map((x) => ({
                                    id: x,
                                    distance:
                                        locationPrecompute
                                            .get(location2.id)
                                            ?.get(x) ?? time,
                                }))
                                .filter((x) => x.distance + 1 < time);

                            if (possibles2.length > 0) {
                                const result = possibles2.reduce<
                                    [number, string[]]
                                >(
                                    (acc2, value2) => {
                                        const newAvailable2 = new Set(
                                            newAvailable
                                        );
                                        const newActions2 = new Map(newActions);
                                        const newLocations2 = new Map(
                                            newLocations
                                        );
                                        newAvailable2.delete(value2.id);
                                        newLocations2.set(
                                            person2,
                                            locationGraph.getNode(value2.id)
                                        );
                                        newActions2.set(person2, {
                                            action: 'move',
                                            completesAt: time - value2.distance,
                                        });

                                        const result2 = dfs(
                                            newLocations2,
                                            newActions2,
                                            newAvailable2,
                                            newUnopened,
                                            time - 1,
                                            newFlow,
                                            total + flow,
                                            [
                                                ...moveLog,
                                                `t${time} ${person2} move ${value2.distance} to ${value2.id}`,
                                            ]
                                        );

                                        return result2[0] > acc2[0]
                                            ? result2
                                            : acc2;
                                    },
                                    [-Infinity, ['start']]
                                );

                                return result[0] > acc[0] ? result : acc;
                            }
                        }

                        const result = dfs(
                            newLocations,
                            newActions,
                            newAvailable,
                            newUnopened,
                            time - 1,
                            newFlow,
                            total + flow,
                            moveLog
                        );

                        return result[0] > acc[0] ? result : acc;
                    },
                    [-Infinity, ['start']]
                );
            }
        }

        return dfs(
            locations,
            actions,
            available,
            newUnopened,
            time - 1,
            newFlow,
            total + flow,
            [...newLog, `t${time} no move`]
        );
    }

    const result = dfs(
        new Map([
            [Me, start],
            [Ele, start],
        ]),
        new Map(),
        flowSet,
        flowSet,
        26,
        0,
        0,
        ['t26 start ' + start.id]
    );

    result[1].forEach((x) => console.log(x));

    return { value: result[0], leaves };
});

// 2611 too low
// sample 50ms
