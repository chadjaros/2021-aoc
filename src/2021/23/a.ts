import { aStar, dijkstra } from '../../utils/find-path';
import { Node } from '../../utils/graph';
import { weights23 } from './input';
import { BoardState, Pathfinder, Room } from './model';

const weights = weights23;

const left = new Room('h-l', true, 2);
const h1 = new Room('h-1', true, 1);
const h2 = new Room('h-2', true, 1);
const h3 = new Room('h-3', true, 1);
const right = new Room('h-r', true, 2);

const a = new Room('A', false, 2, ['D', 'C']);
const b = new Room('B', false, 2, ['D', 'C']);
const c = new Room('C', false, 2, ['A', 'B']);
const d = new Room('D', false, 2, ['A', 'B']);

const link = (a: Node, b: Node) => {
    a.edges.push({nodeId: b.id, weight: 2});
    b.edges.push({nodeId: a.id, weight: 2});
};

link(left, h1);
link(h1, h2);
link(h2, h3);
link(h3, right);
link(a, left);
link(a, h1);
link(b, h1);
link(b, h2);
link(c, h2);
link(c, h3);
link(d, h3);
link(d, right);

const nodeMap = new Map([left, h1, h2, h3, right, a, b, c, d].map((x) => [x.id, x]));

const graph = {
    getNode: (id: string) => nodeMap.get(id)!
};

// Find distances to each node from each node
const distances = new Map([...nodeMap]
    .map(([id, value]) => [id, dijkstra(value, graph)!.distances]));

const initial = new BoardState(nodeMap, weights, distances);
const target = new BoardState(
    new Map([left.clone([undefined, undefined]), h1.clone([undefined]), h2.clone([undefined]), h3.clone([undefined]), right.clone([undefined, undefined]), a.clone(['A', 'A']), b.clone(['B', 'B']), c.clone(['C', 'C']), d.clone(['D', 'D'])].map((x) => [x.id, x])),
    weights,
    distances,
);

const p = new Pathfinder(initial, true);

const result = aStar(p, new Pathfinder(target), Pathfinder.h, p);
console.log(result?.cost);

console.log('~~~~~');
console.log('~~~~~');
console.log('~~~~~');
result?.path.forEach((x, i) => console.log(x.id, result?.pathCost[i]));