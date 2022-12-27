import path from 'path';
import { aoc } from '../../utils/aoc';
import { aStar } from '../../utils/find-path';
import { Edge, Node, SimpleGraph } from '../../utils/graph';
import { Grid } from '../../utils/grid';
import { Point } from '../../utils/point-2d';


function makeNextGrid(grid: Grid<string[]>): Grid<string[]> {
    const nextGrid = Grid.fromSize(grid.width, grid.height, () => ([] as string[]));

    grid.forEach((value, point) => {
        if (value.length === 0) {
            return;
        }
        else if (value[0] === '#') {
            nextGrid.setValue(point, ['#']);
        }
        else {
            value.forEach((char) => {
                let nextPt = new Point(0, 0);
                if (char === '<') {
                    const nextX = point.x - 1;
                    
                    nextPt = new Point(
                        nextX === 0 ? grid.width-2 : nextX,
                        point.y
                    );
                }
                else if (char === '>') {
                    const nextX = point.x + 1;
                    
                    nextPt = new Point(
                        nextX === grid.width-1 ? 1 : nextX,
                        point.y
                    );
                }
                else if (char === 'v') {
                    const nextY = point.y + 1;
                    
                    nextPt = new Point(
                        point.x,
                        nextY === grid.height-1 ? 1 : nextY,
                    );
                }
                else if (char === '^') {
                    const nextY = point.y - 1;
                    
                    nextPt = new Point(
                        point.x,
                        nextY === 0 ? grid.height-2 : nextY,
                    );
                }

                nextGrid.getValue(nextPt).push(char);
            });
        }
    });
        
    return nextGrid;
}

class State implements Node {

    static grids = new Map<number, Grid<string[]>>();

    constructor(
        public graph: SimpleGraph<State>,
        public point: Point,
        public grid: Grid<string[]>,
        public time: number
    ) {}
    
    get id(): string { return `t${this.time}-`+this.point.key;}
    
    clone(): State {
        return new State(
            this.graph,
            this.point,
            this.grid,
            this.time
        );
    }

    get edges(): Edge[] {
        const nextTime = this.time + 1;
        if (!State.grids.has(nextTime)) {
            State.grids.set(nextTime, makeNextGrid(this.grid));
        }

        const nextGrid = State.grids.get(nextTime)!;

        return [this.point, ...nextGrid.adjacentTo(this.point, false)]
            .filter((p) => nextGrid.getValue(p).length === 0)
            .map(p => {

                const nextState = this.clone();
                nextState.point = p;
                nextState.grid = nextGrid;
                nextState.time = nextTime;

                this.graph.setNode(nextState);

                return {
                    nodeId: nextState.id,
                    weight: 1
                };
            });
    }

}

aoc((infile) => {

    const input = infile
        // .sample()
        .grid(
            '', 
            x => x === '.' ? [] : [x] );

    const start = input.scanIncXFrom(new Point(0, 0), value => value.length === 0)!;
    const end = input.scanIncXFrom(new Point(0, input.height-1), value => value.length === 0)!;

    console.log(start, end);
    
    // input.print((v) => v.length === 0 ? ' ' : v.length === 1 ? v[0] : ''+v.length);

    const graph = new SimpleGraph<State>();
    const initialState = new State(
        graph,
        start,
        input,
        0
    );
    graph.setNode(initialState);

    const result = aStar(
        initialState, 
        (s) => s.point.key === end.key, 
        (s) => s.point.manhattanDistance(end),
        graph
    );


    const startReturn = result!.path[result!.path.length-1];

    const result2 = aStar(
        startReturn, 
        (s) => s.point.key === start.key, 
        (s) => s.point.manhattanDistance(start),
        graph
    );

    const secondStart = result2!.path[result2!.path.length-1];

    const result3 = aStar(
        secondStart, 
        (s) => s.point.key === end.key, 
        (s) => s.point.manhattanDistance(end),
        graph
    );

    const final = result3!.path[result3!.path.length-1];

    return {value: final.time};
});