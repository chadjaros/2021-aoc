import { v4 } from 'uuid';
import { aoc } from '../../ts-utils/aoc';
import { aStar, dijkstra } from '../../ts-utils/find-path';
import { Edge, Graph, Node, SimpleGraph } from '../../ts-utils/graph';
import { Point } from '../../ts-utils/point-2d';
import { Possible } from '../../ts-utils/util-types';
import { OrderedMap } from '../../ts-utils/ordered-map';

function dijkstraMulti<T extends Node>(
    start: T,
    graph: Graph<T>,
    isEnd: (n: T) => boolean = () => false,
): Possible<{
    distances: Map<string, number>;
    previous: Map<string, T[]>;
    targets?: T[];
    costToTarget?: number;
}> {
    const distances = new Map<string, number>();
    const previous = new Map<string, T[]>();
    const sort = (a: T, b: T) =>
        (distances.get(a.id) ?? 0) - (distances.get(b.id) ?? 0);
    const openSet = new OrderedMap<string, T>(sort);

    openSet.set(start.id, start);
    distances.set(start.id, 0);
    let endCost: undefined | number = undefined;
    const result = {
        distances,
        previous,
        targets: new Array<T>(),
        costToTarget: 0
    };
    while (openSet.front() !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const current = openSet.popFront()![1];

        if (endCost && distances.get(current.id)! > endCost) {
            return result;
        }
        if (isEnd(current)) {
            endCost = distances.get(current.id)!;
            result.targets.push(current);
            result.costToTarget = endCost;
        }

        current.edges.forEach((neighborEdge) => {
            const alt = (distances.get(current.id) ?? 0) + neighborEdge.weight;
            if (alt < (distances.get(neighborEdge.nodeId) ?? Infinity)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const neighbor = graph.getNode(neighborEdge.nodeId)!;
                previous.set(neighbor.id, [current]);
                distances.set(neighbor.id, alt);
                if (!openSet.has(neighbor.id)) {
                    openSet.set(neighbor.id, neighbor);
                }
            }
            else if (alt === (distances.get(neighborEdge.nodeId) ?? Infinity)) {
                const neighbor = graph.getNode(neighborEdge.nodeId)!;
                previous.get(neighbor.id)!.push(current);
            }
        });
    }

    return { distances, previous };
}

aoc((infile) => {
    const grid = infile.grid();

    const dirMap = new Map([
        ['^', (p: Point) => p.add(0, -1)],
        ['v', (p: Point) => p.add(0, 1)],
        ['<', (p: Point) => p.add(-1, 0)],
        ['>', (p: Point) => p.add(1, 0)],
    ]);
    const edgeMap = new Map([
        ['^', { fwd: '^', turns: ['<', '>'] }],
        ['v', { fwd: 'v', turns: ['<', '>'] }],
        ['>', { fwd: '>', turns: ['^', 'v'] }],
        ['<', { fwd: '<', turns: ['^', 'v'] }],
    ]);

    const start = grid.find((v) => v === 'S');
    const end = grid.find((v) => v === 'E');

    class MazeNode implements Node {

        readonly id: string;
        constructor(
            readonly point: Point,
            readonly direction: string,
            readonly cost: number,
            readonly path: MazeNode[],
            readonly graph: SimpleGraph<MazeNode>,
        ) {
            this.id = point.key + '-' + direction;
        }

        get edges(): Edge[] {
            const d = edgeMap.get(this.direction)!;
            const pathNext = [...this.path, this];
            const edgePrep = [{ dir: this.direction, point: dirMap.get(d.fwd)!(this.point), cost: 1 }];
            edgePrep.push(...d.turns.map((_) => ({ dir: _, point: dirMap.get(_)!(this.point), cost: 1001 })));

            const edges = edgePrep.filter((_) => grid.getValue(_.point) !== '#').map((_) => {
                const nnode = new MazeNode(_.point, _.dir, _.cost, pathNext, this.graph);
                this.graph.setNode(nnode);
                return {
                    nodeId: nnode.id,
                    weight: _.cost
                };
            });
            return edges;
        }
    }

    const graph = new SimpleGraph<MazeNode>();
    const startNode = new MazeNode(start!, '>', 0, [], graph);

    graph.setNode(startNode);

    const result = dijkstraMulti(startNode, graph, (n) => n.point.key === end!.key);

    const valueSet = new Set<string>();
    let current = result!.targets!;
    while (current.length > 0) {
        const next: MazeNode[] = [];
        for (const it of current) {
            valueSet.add(it.point.key);
            const prevs = result?.previous.get(it.id);
            if (prevs) {
                next.push(...prevs);
            }
        }
        current = next;
    }

    const value = valueSet.size;
    return { value };
});
