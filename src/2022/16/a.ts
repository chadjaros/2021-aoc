import { readFileSync } from 'fs';
import { aoc } from '../../ts-utils/aoc';
import { dijkstra } from '../../ts-utils/find-path';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';

interface Location {
    id: string;
    flow: number;
    edges: Edge[];
}

let stateId = 0;

class State implements Node {
    readonly id = '' + stateId++;

    constructor(
        readonly graph: SimpleGraph<State>,
        readonly locations: SimpleGraph<Location>,
        public location: Location,
        public time: number,
        public flow: number,
        public total: number,
        public op: string,
        public visited: Set<string>
    ) { }

    clone(): State {
        return new State(
            this.graph,
            this.locations,
            this.location,
            this.time,
            this.flow,
            this.total,
            this.op,
            new Set(this.visited)
        );
    }

    get edges(): Edge[] {
        if (this.time === 31) {
            return [];
        }
        if (!this.visited.has(this.location.id) && this.location.flow > 0) {
            const clone = this.clone();
            clone.visited.add(clone.location.id);
            clone.op =
                'm' +
                this.time +
                ' open ' +
                clone.location.id +
                ' +' +
                clone.location.flow +
                ' flow; cost 1';
            clone.time++;
            clone.total += clone.flow;
            clone.flow += clone.location.flow;
            clone.graph.setNode(clone);
            return [
                {
                    nodeId: clone.id,
                    weight: this.flow,
                },
            ];
        } else {
            const nexts = dijkstra(this.location, this.locations);
            if (!nexts) {
                throw new Error('fail');
            }

            const moves = Array.from(nexts.distances.entries())
                .filter(
                    ([id, distance]) =>
                        !this.visited.has(id) &&
                        this.locations.getNode(id).flow !== 0 &&
                        30 - this.time > distance + 1
                )
                .map(([id, distance]) => {
                    const clone = this.clone();
                    clone.location = clone.locations.getNode(id);
                    clone.total += distance * clone.flow;
                    clone.op =
                        'm' +
                        this.time +
                        ' move to ' +
                        clone.location.id +
                        ' cost ' +
                        distance;
                    clone.time += distance;
                    this.graph.setNode(clone);

                    return {
                        nodeId: clone.id,
                        weight: distance * this.flow,
                    };
                });

            if (moves.length > 0) {
                return moves;
            }

            const clone = this.clone();
            const remaining = 31 - this.time;
            clone.total += remaining * clone.flow;
            clone.op = 'm' + this.time + ' use remaining cost ' + remaining;
            clone.time += remaining;
            this.graph.setNode(clone);

            return [
                {
                    nodeId: clone.id,
                    weight: remaining * this.flow,
                },
            ];
        }
    }
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

    const graph = new SimpleGraph<State>();
    const startState = new State(
        graph,
        locationGraph,
        location,
        1,
        0,
        0,
        'start',
        new Set()
    );

    graph.setNode(startState);
    const result = dijkstra(startState, graph);

    const distances = Array.from(result?.distances.entries() || []).sort(
        (a, b) => b[1] - a[1]
    );
    console.log(distances.slice(0, 10));

    const recalc = [graph.getNode(distances[0][0])];

    while (result?.previous.has(recalc[0].id)) {
        recalc.unshift(result!.previous.get(recalc[0].id)!);
    }

    for (const r of recalc) {
        console.log(r.op, 'total', r.total, 'flow', r.flow);
    }
    return { value: distances[0][1] };
});
