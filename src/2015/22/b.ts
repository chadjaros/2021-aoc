/* eslint-disable @typescript-eslint/indent */
import { aoc } from '../../ts-utils/aoc';
import { aStar, dijkstra } from '../../ts-utils/find-path';
import { Edge, SimpleGraph } from '../../ts-utils/graph';
import { Player, SpellList, State } from './model';

export class HardState extends State {
    clone(): HardState {
        return new HardState(
            this.g,
            { ...this.p },
            { ...this.boss },
            new Map(this.activeSpells.entries()),
            this.manaSpent,
            this.lastCast,
            this.turn,
            this.winner
        );
    }

    get edges(): Edge[] {
        return SpellList.filter(
            (x) => !this.activeSpells.has(x.name) && this.p.mana >= x.cost
        )
            .map<Edge | undefined>((spell) => {
                const ns = this.clone();

                ns.g.setNode(ns);

                const edge = {
                    nodeId: ns.id,
                    weight: spell.cost,
                };

                ns.cast(spell);

                if (ns.boss.hit_points <= 0) {
                    ns.winner = true;
                    return edge;
                }

                // process boss turn

                ns.startOfTurn();
                if (ns.boss.hit_points <= 0) {
                    ns.winner = true;
                    return edge;
                }

                ns.p.hit_points -= Math.max(1, ns.boss.damage - ns.p.armor);
                if (ns.p.hit_points <= 0) {
                    // You lose, stop following this edge
                    return undefined;
                }

                // process start of player's next turn
                ns.p.hit_points -= 1;
                if (ns.p.hit_points <= 0) {
                    return undefined;
                }

                ns.startOfTurn();
                if (ns.boss.hit_points <= 0) {
                    ns.winner = true;
                    return edge;
                }

                return edge;
            })
            .filter((e) => e !== undefined) as Edge[];
    }
}

aoc((infile) => {
    const boss = infile.lines.reduce<Record<string, number>>((acc, x) => {
        const s = x.split(': ');

        acc[s[0].replace(' ', '_').toLowerCase()] = parseInt(s[1]);
        return acc;
    }, {}) as unknown as Player;

    const basePlayer: Player = {
        hit_points: 50,
        mana: 500,
        armor: 0,
        damage: 0,
    };

    const graph = new SimpleGraph<HardState>();
    const startState = new HardState(
        graph,
        basePlayer,
        boss,
        new Map(),
        0,
        undefined,
        1,
        false
    );
    // lose hp at the start of turn 1
    startState.p.hit_points--;

    graph.setNode(startState);

    const result = aStar(
        startState,
        (state: State) => state.winner,
        (state: State) => state.boss.hit_points,
        graph
    );

    for (const p of result?.path ?? []) {
        console.log(
            `${p.turn} - tc:${p.manaSpent} ph:${p.p.hit_points} pm:${p.p.mana
            } s:${p.lastCast?.name} c:${p.lastCast?.cost} b:${p.boss.hit_points
            } s:${Array.from(p.activeSpells.entries()).join(';')}`
        );
    }

    return {
        value: result?.cost ?? -1,
    };
});
