import { Node } from '../../ts-utils/graph';
import { input13 } from './input';

const input = input13;

const nodes = input.reduce((acc, value) => {
    if (!acc.has(value.root)) {
        acc.set(value.root, {
            id: value.root,
            edges: [],
        });
    }
    acc.get(value.root)?.edges.push(value);

    return acc;
}, new Map<string, Node>());

function search(
    node: Node,
    path: Node[],
    seen: Set<string>,
    graph: Map<string, Node>
): number {
    if (seen.has(node.id)) {
        return -Infinity;
    }

    if (node.edges.every((x) => seen.has(x.nodeId))) {
        path.push(node);

        return path.reduce((acc, node, idx) => {
            const leftIdx = idx - 1 < 0 ? path.length - 1 : idx - 1;
            const leftWeight = node.edges.find(
                (e) => e.nodeId === path[leftIdx].id
            )?.weight;
            const rightIdx = idx + 1 >= path.length ? 0 : idx + 1;
            const rightWeight = node.edges.find(
                (e) => e.nodeId === path[rightIdx].id
            )?.weight;

            return acc + leftWeight! + rightWeight!;
        }, 0);
    }

    return Math.max(
        ...node.edges.map((e) => {
            const edge = graph.get(e.nodeId)!;
            return search(
                edge,
                [...path, node],
                new Set([...seen.values(), node.id]),
                graph
            );
        })
    );
}

const start = nodes.values().next().value as Node;
console.log(search(start, [], new Set(), nodes));
