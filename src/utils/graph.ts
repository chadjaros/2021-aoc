export interface Edge {
    nodeId: string;
    weight: number;
}

export interface Node {
    id: string;
    edges: Edge[];
}

export interface Graph {
    getNode(s: string): Node;
}