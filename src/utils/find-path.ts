import { Graph, Node } from './graph';
import { OrderedMap } from './ordered-map';
import { Possible } from './util-types';

/**
 * 
 * @param start 
 * @param end 
 * @param h A heurestic indicating the relative distance from the target. Take care not to overestimate this or you could end up with an overoptimization
 * @param graph 
 * @returns 
 */
export function aStar(start: Node, end: Node, h: (node: Node) => number, graph: Graph): Possible<{path: Node[], pathCost: number[], cost: number}> {

    const gScore = new Map<string, number>();
    const fScore = new Map<string, number>();
    const cameFrom = new Map<string, Node>();
    const openSet = new OrderedMap<string, Node>((a, b) => (fScore.get(a.id) ?? 0) - (fScore.get(b.id) ?? 0));
    const seen = new Set<string>();

    openSet.set(start.id, start);
    gScore.set(start.id, 0);
    fScore.set(start.id, h(start));

    while(openSet.front()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const current = openSet.popFront()![1];

        // End condition met, return the path
        if (current?.id === end.id) {
            const path = [current];
            const pathCost = [gScore.get(end.id) ?? -1];
            let next = current;
            while(cameFrom.has(next.id)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                next = cameFrom.get(next.id)!;
                path.splice(0, 0, next);
                pathCost.splice(0, 0, gScore.get(next.id) ?? -1);
            }
            return { path, pathCost, cost: gScore.get(end.id) ?? -1 };
        }

        openSet.delete(current.id);
        seen.add(current.id);

        current.edges.forEach((neighborEdge) => {

            const t_gScore = (gScore.get(current.id) ?? 0) + neighborEdge.weight;
            // console.log('inspecting', neighborEdge.nodeId, t_gScore, gScore.get(current.id), neighborEdge.weight, seen.has(neighborEdge.nodeId));
            // console.log('edge', neighborEdge.nodeId, neighborEdge.weight, t_gScore);
            if (t_gScore < (gScore.get(neighborEdge.nodeId) ?? Infinity)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const neighbor = graph.getNode(neighborEdge.nodeId)!;
                cameFrom.set(neighbor.id, current);
                gScore.set(neighbor.id, t_gScore);
                fScore.set(neighbor.id, t_gScore + h(neighbor));
                if (!openSet.has(neighbor.id)) {
                    openSet.set(neighbor.id, neighbor);
                }
            }
        });
    }

    return undefined;
}


export function dijkstra(start: Node, graph: Graph): Possible<{distances: Map<string, number>, previous: Map<string, Node>}> {

    const distances = new Map<string, number>();
    const previous = new Map<string, Node>();
    const openSet = new OrderedMap<string, Node>((a, b) => (distances.get(a.id) ?? 0) - (distances.get(b.id) ?? 0));

    openSet.set(start.id, start);
    distances.set(start.id, 0);

    while(openSet.front()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const current = openSet.popFront()![1];

        openSet.delete(current.id);

        current.edges.forEach((neighborEdge) => {

            const alt = (distances.get(current.id) ?? 0) + neighborEdge.weight;
            if (alt < (distances.get(neighborEdge.nodeId) ?? Infinity)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const neighbor = graph.getNode(neighborEdge.nodeId)!;
                previous.set(neighbor.id, neighbor);
                distances.set(neighbor.id, alt);
                if (!openSet.has(neighbor.id)) {
                    openSet.set(neighbor.id, neighbor);
                }
            }
        });
    }

    return {distances, previous};
}

