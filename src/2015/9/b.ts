import { Edge } from '../../ts-utils/graph';
import { input9 } from './input';

const input = input9;

let maxDistance = 0;

const search = (edge: Edge, distance = 0, seen = new Set<string>()): void => {
    const node = input.get(edge.nodeId)!;

    const remainingNodes = node.edges.filter((e) => !seen.has(e.nodeId));

    const newDistance = distance + edge.weight;

    if (remainingNodes.length === 0) {
        // visited everything

        if (newDistance > maxDistance) {
            maxDistance = newDistance;
        }
        return;
    } else {
        remainingNodes.forEach((e) => {
            search(e, newDistance, new Set([...seen, node.id]));
        });
    }
};

[...input9.values()]
    .map((x) => ({ nodeId: x.id, weight: 0 }))
    .forEach((x) => search(x));

console.log(maxDistance);
