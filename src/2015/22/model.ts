/* eslint-disable @typescript-eslint/indent */
import { v4 } from 'uuid';
import { Edge, Node, SimpleGraph } from '../../ts-utils/graph';

export interface Player {
    hit_points: number;
    mana: number;
    damage: number;
    armor: number;
}

export interface Spell {
    name: string;
    cost: number;
    duration: number;
}

export enum SpellNames {
    MagicMissile = 'mm',
    Drain = 'd',
    Shield = 's',
    Poison = 'p',
    Recharge = 'r',
}

export const SpellList = [
    {
        name: SpellNames.MagicMissile,
        cost: 53,
        duration: 0,
    },
    {
        name: SpellNames.Drain,
        cost: 73,
        duration: 0,
    },
    {
        name: SpellNames.Shield,
        cost: 113,
        duration: 6,
    },
    {
        name: SpellNames.Poison,
        cost: 173,
        duration: 6,
    },
    {
        name: SpellNames.Recharge,
        cost: 229,
        duration: 5,
    },
];

export class State implements Node {
    readonly id = v4();

    constructor(
        public g: SimpleGraph<State>,
        readonly p: Player,
        readonly boss: Player,
        readonly activeSpells: Map<string, number>,
        public manaSpent: number,
        public lastCast: Spell | undefined,
        public turn: number,
        public winner: boolean
    ) { }

    cast(spell: Spell): void {
        this.p.mana -= spell.cost;
        this.manaSpent += spell.cost;
        this.lastCast = spell;

        if (spell.name === SpellNames.MagicMissile) {
            this.boss.hit_points -= 4;
        } else if (spell.name === SpellNames.Drain) {
            this.boss.hit_points -= 2;
            this.p.hit_points += 2;
        } else if (spell.name === SpellNames.Shield) {
            this.p.armor = 7;
        }

        if (spell.duration !== 0) {
            this.activeSpells.set(spell.name, spell.duration);
        }
    }

    startOfTurn(): void {
        this.turn++;
        const toDelete: string[] = [];
        this.activeSpells.forEach((duration, name) => {
            if (name === SpellNames.Poison) {
                this.boss.hit_points -= 3;
            } else if (name === SpellNames.Recharge) {
                this.p.mana += 101;
            } else if (name === SpellNames.Shield && duration === 1) {
                this.p.armor = 0;
            }
            if (duration === 1) {
                toDelete.push(name);
            }
            this.activeSpells.set(name, duration - 1);
        });
        toDelete.forEach((n) => this.activeSpells.delete(n));
    }

    clone(): State {
        return new State(
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
                ns.startOfTurn();

                if (ns.boss.hit_points <= 0) {
                    ns.winner = true;
                }

                return edge;
            })
            .filter((e) => e !== undefined) as Edge[];
    }
}
