export interface Edge {
    nodeId: string;
    weight: number;
}

export interface Node {
    id: string;
    edges: Edge[];
}

export interface Graph<T extends Node> {
    getNode(s: string): T;
}

export class SimpleGraph<T extends Node> implements Graph<T> {
    private nodes: Map<string, T>;

    constructor(initialNodes: T[] = []) {
        this.nodes = new Map(initialNodes.map((x) => [x.id, x]));
    }

    hasNode(s: string): boolean {
        return this.nodes.has(s);
    }

    getNode(s: string): T {
        if (!this.hasNode(s)) {
            throw new Error('no such node');
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.nodes.get(s)!;
    }

    setNode(node: T) {
        this.nodes.set(node.id, node);
    }

    get allNodes(): T[] {
        return Array.from(this.nodes.values());
    }
}
