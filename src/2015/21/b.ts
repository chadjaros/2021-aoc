import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';
import { armor, Item, rings, weapons } from './shop';

interface Player {
    hit_points: number;
    damage: number;
    armor: number;
}

const calcDamage = (at: Player, def: Player): number => {
    const raw = at.damage - def.armor;
    if (raw <= 0) {
        return 1;
    }
    return raw;
};

const sim = (p: Player, boss: Player): boolean => {
    const ps = [{...p}, {...boss}];

    let playerTurn = false;
    while (ps.every((x) => x.hit_points > 0)) {
        playerTurn = !playerTurn;

        const att = playerTurn ? ps[0] : ps[1];
        const def = playerTurn ? ps[1] : ps[0];

        const dmg = calcDamage(att, def);
        def.hit_points -= dmg;
    }

    return playerTurn;
};

interface Loadout {
    weapon: Item;
    armor: Item[];
    rings: Item[];
    cost: number;
}

const loadouts = (): Loadout[] => {

    const armorOptions = [[], ...armor.map((x) => [x])];
    const ringOptions = [[], ...rings.map((x) => [x])];

    // two ring options
    for (let i = 0; i < rings.length; i++) {
        for (let j = i + 1; j < rings.length; j++) {
            ringOptions.push([rings[i], rings[j]]);
        }
    }

    const result: Loadout[] = [];
    for (const w of weapons) {
        for (const a of armorOptions) {
            for (const r of ringOptions) {
                result.push({
                    weapon: w,
                    armor: a,
                    rings: r,
                    cost: w.cost + a.reduce((acc, v) => acc + v.cost, 0) + r.reduce((acc, v) => acc + v.cost, 0)
                });
            }
        }
    }

    result.sort((a, b) => b.cost - a.cost);
    return result;
};

const findWinner = (base: Player, boss: Player): [Player, Loadout] => {
    
    for (const l of loadouts()) {
        const player: Player = {
            hit_points: base.hit_points,
            damage: base.armor + l.weapon.damage + l.armor.reduce((a, v) => a + v.damage, 0) + l.rings.reduce((a, v) => a + v.damage, 0), 
            armor: base.armor + l.weapon.defense + l.armor.reduce((a, v) => a + v.defense, 0) + l.rings.reduce((a, v) => a + v.defense, 0),
        };

        if (!sim(player, boss)) {
            return [player, l];
        }
    }

    throw new Error('no winner');
};

aoc(() => {
    const boss = readFileSync(__dirname + '/input.txt').toString().split('\n')
        .reduce<Record<string, number>>((acc, x) => {
        const s = x.split(': ');

        acc[s[0].replace(' ', '_').toLowerCase()] = parseInt(s[1]);
        return acc;
    }, {}) as unknown as Player;

    const basePlayer: Player = {
        hit_points: 100,
        damage: 0,
        armor: 0,
    };

    const [player, loadout] = findWinner(basePlayer, boss);

    return {value: loadout.cost, boss, player, loadout};
});

