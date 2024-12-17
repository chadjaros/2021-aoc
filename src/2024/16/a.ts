import { aoc } from '../../ts-utils/aoc';
import { dijkstra } from '../../ts-utils/find-path';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';
import { Point } from '../../ts-utils/point-2d';

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
            const edgePrep = [{ dir: this.direction, point: dirMap.get(d.fwd)!(this.point), cost: 1 }];
            edgePrep.push(...d.turns.map((_) => ({ dir: _, point: dirMap.get(_)!(this.point), cost: 1001 })));

            const edges = edgePrep.filter((_) => grid.getValue(_.point) !== '#').map((_) => {
                const nnode = new MazeNode(_.point, _.dir, _.cost, [...this.path, this], this.graph);
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

    const result = dijkstra(startNode, graph, (n) => n.point.key === end!.key);

    const value = result!.costToTarget!;
    return { value };
});
