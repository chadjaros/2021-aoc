import { v4 } from 'uuid';
import { Edge, Node, SimpleGraph } from '../../utils/graph';

export interface Player {
    hit_points: number;
    mana: number;
    damage: number;
}

export enum Spell {
    MagicMissile = 'mm',
    Drain = 'd',
    Shield = 's',
    Poison = 'p',
    Recharge = 'r',
}

export interface ActiveSpell {
    spell: Spell;
    remainingDuration: number;
}

export class State implements Node {

    readonly id = v4();

    constructor(
        private g: SimpleGraph<State>,
        readonly p: Player,
        readonly boss: Player,
        readonly activeSpells: ActiveSpell[]
    ){

    }

    get edges(): Edge[] {
        return [];
    }

}