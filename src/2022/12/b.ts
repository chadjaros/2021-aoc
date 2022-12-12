import { aoc } from '../../utils/aoc';
import { aStar } from '../../utils/find-path';
import { Edge, Node, SimpleGraph } from '../../utils/graph';
import { Grid } from '../../utils/grid';
import { Point } from '../../utils/point-2d';


class N implements Node {
    constructor(public p: Point,
        public grid: Grid<number>,
        public graph: SimpleGraph<N>) {

    }
    get id(): string {return this.p.key;}
    
    get edges(): Edge[] {
        const v = this.grid.getValue(this.p);
        return this.p.adjacents(false)
            .filter((a) => this.grid.isValid(a) && this.grid.getValue(a) <= v + 1)
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
    
    let dest: Point = new Point(0, 0);

    const g = input.map((row, y) => {
        return row.map((v, x) => {
            if (v === 'S') {
                return 'a'.charCodeAt(0);
            }
            else if (v === 'E') {
                dest = new Point(x, y);
                return 'z'.charCodeAt(0);
            }
            return v.charCodeAt(0);
        });
    });


    const grid = new Grid(g);
    const endNode = new N(dest, grid, graph); 

    const aVal = 'a'.charCodeAt(0);

    let value = Infinity;
    grid.forEach((v, start) => {
        if (v === aVal) {
            const startNode = new N(start, grid, graph);
            graph.setNode(startNode);

            const result = aStar<N>(startNode, endNode, (n) => endNode.p.manhattanDistance(n.p), graph);
            const cost = result?.cost ?? Infinity;
            if (cost > 0 && cost < value) {
                value = cost;
            }
        }
    });


    return {value};
});