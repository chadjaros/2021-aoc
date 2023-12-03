import { Edge, Graph, Node } from '../../ts-utils/graph';
import { Series } from '../../ts-utils/series';
import { Possible } from '../../ts-utils/util-types';

export class Room implements Node {
    public contents: Possible<string>[];
    public edges: Edge[];

    constructor(
        public id: string,
        public readonly hallway = true,
        private size = 2,
        contents?: Possible<string>[],
        edges?: Edge[]
    ) {
        this.contents = contents ?? [...Series.of(size, undefined)];
        this.edges = edges ?? [];
    }

    get available(): boolean {
        return this.contents.some((x) => x === undefined);
    }

    isHome(index: number): boolean {
        return !this.hallway && this.contents[index] === this.id;
    }

    canPush(value: string): boolean {
        return this.available && (this.hallway || value === this.id);
    }

    canMoveTo(value: string, other: Room): boolean {
        if (!other.available) {
            return false;
        }

        if (!this.hallway && other.hallway) {
            return true;
        }

        if (
            !other.hallway &&
            value === other.id &&
            other.contents.every((x) => x === undefined || x === value)
        ) {
            return true;
        }

        return false;
    }

    push(value: string): { value: string; distance: number }[] {
        if (!this.available) {
            return [];
        }
        const result: { value: string; distance: number }[] = [];
        let i = 0;
        let next: Possible<string> = value;
        let prev: Possible<string> = undefined;
        while (next !== undefined) {
            prev = this.contents[i];
            this.contents[i] = next;
            next = prev;
            i++;
            if (next !== undefined) {
                result.push({ value: next, distance: 1 });
            }
        }
        return result;
    }

    peek(): Possible<{ value: string; distance: number }> {
        const i = this.contents.findIndex((x) => x !== undefined);
        if (i < 0) {
            return;
        }
        // If the first value is home and it's not hiding any values behind it
        if (
            this.contents[i] === this.id &&
            !this.contents.some(
                (x, index) => x !== undefined && x !== this.id && index > i
            )
        ) {
            return;
        }

        const value = this.contents[i]!;

        return {
            value,
            distance: i,
        };
    }

    get key(): string {
        return `${this.id}|${this.contents.map((x) => x ?? '.').join('')}`;
    }

    clone(altContents?: Possible<string>[]): Room {
        return new Room(
            this.id,
            this.hallway,
            this.size,
            altContents ?? [...this.contents],
            this.edges
        );
    }
}

export class BoardState implements Graph {
    private _projectedCost = -1;

    constructor(
        public nodes: Map<string, Room>,
        public amphiWeight: Map<string, number>,
        public readonly nodeDistances: Map<string, Map<string, number>>
    ) { }

    getNode(key: string): Room {
        const n = this.nodes.get(key);
        if (!n) {
            throw new Error(`Node ${key} not found`);
        }
        return n;
    }

    clone(): BoardState {
        return new BoardState(
            new Map([...this.nodes].map(([id, value]) => [id, value.clone()])),
            this.amphiWeight,
            this.nodeDistances
        );
    }

    get projectedCost() {
        if (this._projectedCost < 0) {
            this._projectedCost = [...this.nodes.values()].reduce((a, room) => {
                return (
                    a +
                    room.contents.reduce((ra, c) => {
                        if (c === undefined) {
                            return ra;
                        }
                        if (c === room.id) {
                            return ra;
                        }
                        return (
                            ra +
                            this.nodeDistances.get(room.id)!.get(c)! *
                            this.amphiWeight.get(c)!
                        );
                    }, 0)
                );
            }, 0);
        }
        return this._projectedCost;
    }

    get key(): string {
        return [...this.nodes.values()].map((x) => x.key).join(';');
    }
}

export class Pathfinder implements Graph, Node {
    public static allNodes = new Map<string, BoardState>();
    public static h = (a: Node) => (a as Pathfinder).state.projectedCost;

    constructor(
        private state: BoardState,
        insert = false
    ) {
        if (insert && !Pathfinder.allNodes.has(state.key)) {
            Pathfinder.allNodes.set(state.key, state);
        }
    }

    get id() {
        return this.state.key;
    }

    get projectedCost(): number {
        return this.state.projectedCost;
    }

    findMoves(
        start: Room,
        current: Room,
        value: string,
        seen = new Set<string>()
    ): Room[] {
        if (seen.has(current.id)) {
            return [];
        }

        seen.add(current.id);

        if (start.id !== current.id) {
            if (!current.available) {
                return [];
            }
        }

        const toHere =
            start.id !== current.id && start.canMoveTo(value, current)
                ? [current]
                : [];

        return [
            ...toHere,
            ...current.edges
                .map((e) => this.state.getNode(e.nodeId))
                .flatMap((n) => this.findMoves(start, n, value, seen)),
        ];
    }

    get edges() {
        return [...this.state.nodes.values()].flatMap((room) => {
            const pullCost = room.peek();
            if (!pullCost) {
                return [];
            }

            const moves = this.findMoves(room, room, pullCost.value);
            if (moves.length === 0) {
                return [];
            }

            return moves.map((m) => {
                const newBoard = this.state.clone();

                const moveSource = newBoard.getNode(room.id)!;
                const moveTarget = newBoard.getNode(m.id)!;

                moveSource.contents[pullCost.distance] = undefined;

                const pushCost = moveTarget.push(pullCost.value);
                let weight = [pullCost, ...pushCost].reduce((a, x) => {
                    return (a +=
                        x.distance * (newBoard.amphiWeight.get(x.value) ?? 0));
                }, 0);

                weight +=
                    newBoard.nodeDistances
                        .get(moveSource.id)!
                        .get(moveTarget.id)! *
                    newBoard.amphiWeight.get(pullCost.value)!;

                const nodeId = newBoard.key;
                Pathfinder.allNodes.set(nodeId, newBoard);

                return { nodeId, weight };
            });
        });
    }

    getNode(key: string): Pathfinder {
        return new Pathfinder(Pathfinder.allNodes.get(key)!);
    }
}
