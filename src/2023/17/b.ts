import { aoc } from '../../ts-utils/aoc';
import { dijkstra, dijkstraSolution } from '../../ts-utils/find-path';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';
import { Grid, GridNode } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

class N implements Node {

    constructor(
        public point: Point,
        public dir: Point,
        public dirCt: number,
        public graph: SimpleGraph<N>,
        public grid: Grid<number>,
    ) {
        graph.setNode(this);
    }

    get id(): string {
        return this.point.key + '|' + this.dir.key + ':' + this.dirCt;
    }

    get edges(): Edge[] {

        const reverseDir = this.dir.times(-1);
        let nextDirs: Point[] = [];
        if (this.dirCt < 4) {
            nextDirs = [this.dir];
        }
        else {
            nextDirs = Point.adjacentDirs().filter((d) => !d.equals(reverseDir) && (this.dirCt < 10 || !d.equals(this.dir)));
        }

        const nextPoints = nextDirs.map((d) => [this.point.plus(d), d]).filter((x) => this.grid.isValid(x[0]));

        return nextPoints
            .map((p) =>
                new N(
                    p[0],
                    p[1],
                    p[1].equals(this.dir) ? this.dirCt + 1 : 1,
                    this.graph,
                    this.grid
                )
            )
            .map<Edge>((n) => {
                return {
                    nodeId: n.id,
                    weight: this.grid.getValue(n.point)
                };
            });
    }
}

aoc((infile) => {
    const grid = infile.grid('', (_) => parseInt(_));

    const graph = new SimpleGraph<N>();
    const startNode: N = new N(
        new Point(0, 0),
        new Point(0, 0),
        4,
        graph,
        grid
    );
    const target = new Point(grid.width - 1, grid.height - 1);
    const result = dijkstra(startNode, graph, (n) => n.point.equals(target) && n.dirCt >= 4);

    const value = result?.costToTarget ?? -1;

    // const resultMap = dijkstraSolution(result)!;
    // resultMap.forEach((n) => console.log(`${n.id} ${result!.distances.get(n.id)}`));
    // grid.print((_, p) => {
    //     return resultMap.find((n) => n.point.equals(p)) ? '#' : _.toString();
    // });

    return { value };
});
