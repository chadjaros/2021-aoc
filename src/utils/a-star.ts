import { Graph, Node } from './graph';
import { OrderedMap } from './ordered-map';
import { Possible } from './util-types';

export function aStar(start: Node, end: Node, h: (node: Node) => number, graph: Graph): Possible<Node[]> {

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const cameFrom = new Map<string, Node>();
    const openSet = new OrderedMap<string, Node>((a, b) => (fScore.get(a.id) ?? 0) - (fScore.get(b.id) ?? 0));
    
    openSet.set(start.id, start);
    gScore.set(start.id, 0);
    fScore.set(start.id, h(start));

    while(openSet.front()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const current = openSet.popFront()![1];

        // End condition met, return the path
        if (current?.id === end.id) {
            const path = [current];
            let next = current;
            while(cameFrom.has(next.id)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                next = cameFrom.get(next.id)!;
                path.splice(0, 0, next);
            }
            return path;
        }

        openSet.delete(current.id);

        current.edges.forEach((neighborEdge) => {

            const t_gScore = (gScore.get(current.id) ?? 0) + neighborEdge.weight;
            if (t_gScore < (gScore.get(neighborEdge.nodeId) ?? 0)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const neighbor = graph.nodes.get(neighborEdge.nodeId)!;
                cameFrom.set(neighbor.id, neighbor);
                gScore.set(neighbor.id, t_gScore);
                fScore.set(neighbor.id, t_gScore + h(neighbor));
                if (!openSet.has(neighbor.id)) {
                    openSet.set(neighbor.id, neighbor);
                }
            }
        });
    }

    return [];
}

