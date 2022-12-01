import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

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

const iterateLoadout = (base: Player): [Player, number] => {
    
    
    
    return [base, 4];
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

    return {value: 5, boss};
});

