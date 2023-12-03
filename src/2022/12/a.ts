import { aoc } from '../../ts-utils/aoc';
import { aStar } from '../../ts-utils/find-path';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

class N implements Node {
    constructor(
        public p: Point,
        public grid: Grid<number>,
        public graph: SimpleGraph<N>
    ) { }
    get id(): string {
        return this.p.key;
    }

    get edges(): Edge[] {
        const v = this.grid.getValue(this.p);
        return this.p
            .adjacents(false)
            .filter(
                (a) => this.grid.isValid(a) && this.grid.getValue(a) <= v + 1
            )
            .map((a) => {
                const e = new N(a, this.grid, this.graph);
                this.graph.setNode(e);
                return {
                    nodeId: e.id,
                    weight: 1,
                };
            });
    }
}

aoc((infile) => {
    const input = infile.splitLines('');

    const graph = new SimpleGraph<N>();

    let start: Point = new Point(0, 0);
    let dest: Point = new Point(0, 0);

    const g = input.map((row, y) => {
        return row.map((v, x) => {
            if (v === 'S') {
                start = new Point(x, y);
                return 'a'.charCodeAt(0);
            } else if (v === 'E') {
                dest = new Point(x, y);
                return 'z'.charCodeAt(0);
            }
            return v.charCodeAt(0);
        });
    });

    const grid = new Grid(g);
    const startNode = new N(start, grid, graph);
    const endNode = new N(dest, grid, graph);
    graph.setNode(startNode);

    const result = aStar<N>(
        startNode,
        endNode,
        (n) => endNode.p.manhattanDistance(n.p),
        graph
    );

    return { value: result?.cost ?? -2 };
});
