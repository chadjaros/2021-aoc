import { aoc } from '../../ts-utils/aoc';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

// class CompressedNode implements Node {
//     constructor(readonly point: Point) { }

//     get id(): string {
//         return this.point.key;
//     }

//     readonly edges: Edge[];

// }

class BFSNode implements Node {
    constructor(
        readonly point: Point,
        readonly steps: number,
        readonly seen: Set<string>,
        readonly grid: Grid<string>,
        readonly graph: SimpleGraph<BFSNode>
    ) {
        graph.setNode(this);
        this.seen.add(this.id);
    }

    get id(): string {
        return this.point.key;
    }

    get edges(): Edge[] {
        return this.grid.nodeAt(this.point).edges
            .filter((gridEdge) => !this.seen.has(gridEdge.nodeId))
            .map((gridEdge) => {
                const gridNode = this.grid.getNode(gridEdge.nodeId);

                const nnode = new BFSNode(gridNode.point, this.steps + 1, new Set(this.seen), this.grid, this.graph);

                return {
                    nodeId: nnode.id,
                    weight: 1,
                };
            });
    }
}

aoc((infile) => {
    const grid: Grid = infile.grid(undefined, undefined, (p, g) => {
        const val = g.getValue(p);
        if (val === '#') {
            return [];
        }
        let adj = p.adjacents().filter((ap) => grid.isValid(ap) && grid.getValue(ap) !== '#');
        if (val === '>') {
            adj = adj.filter((ap) => ap.equals(Point.Cardinals.Right.plus(p)));
        } else if (val === 'v') {
            adj = adj.filter((ap) => ap.equals(Point.Cardinals.Down.plus(p)));
        } else if (val === '<') {
            adj = adj.filter((ap) => ap.equals(Point.Cardinals.Left.plus(p)));
        } else if (val === '^') {
            adj = adj.filter((ap) => ap.equals(Point.Cardinals.Up.plus(p)));
        }
        return adj.map((ap) => ({
            nodeId: ap.key,
            weight: 1,
        }));
    });

    // const start = new CompressedNode(grid.scanIncXFrom(new Point(0, 0), (v) => v === '.')!);
    // const end = new CompressedNode(grid.scanIncXFrom(new Point(0, grid.height - 1), (v) => v === '.')!);
    // const compressed = new SimpleGraph([start, end]);

    // const seen = new Set<string>();
    // const stack = [{from: start.point, at: start.point, seen: new Set<string>()}];
    // while(stack.length > 0) {
    //     const current = stack.shift()!;

    //     if (seen.has(current.at.key)) {
    //         continue;
    //     }
    //     seen.add(current.at.key);

    // }

    const start = grid.scanIncXFrom(new Point(0, 0), (v) => v === '.')!;
    const end = grid.scanIncXFrom(new Point(0, grid.height - 1), (v) => v === '.')!;

    const graph = new SimpleGraph<BFSNode>();
    const stack = [...new BFSNode(start, 0, new Set(), grid, graph).edges];
    const ends: BFSNode[] = [];
    while (stack.length > 0) {
        const edge = stack.shift()!;
        const current = graph.getNode(edge.nodeId);
        if (current.point.equals(end)) {
            ends.push(current);
            continue;
        }

        const edges = current.edges;
        // console.log(edge.nodeId, current.steps, edges);
        stack.push(...edges);
    }

    const value = ends.reduce((acc, _) => Math.max(_.steps, acc), 0);
    console.log(ends.map((_) => _.steps));

    return { value };
});
