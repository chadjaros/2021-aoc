import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';
import { dijkstra } from '../../utils/find-path';

interface Player {
    hit_points: number;
    mana: number;
    damage: number;
}

// dijkstra()
// const sim = (p: Player, boss: Player): boolean => {
//     const ps = [{...p}, {...boss}];

   
//     while (ps.every((x) => x.hit_points > 0)) {
//         playerTurn = !playerTurn;

//         const att = playerTurn ? ps[0] : ps[1];
//         const def = playerTurn ? ps[1] : ps[0];

//         const dmg = calcDamage(att, def);
//         def.hit_points -= dmg;
//     }

//     return playerTurn;
// };


// const findWinner = (base: Player, boss: Player): [Player, Spell[]] => {
    
    

//     throw new Error('no winner');
// };

// aoc(() => {
//     const boss = readFileSync(__dirname + '/input.txt').toString().split('\n')
//         .reduce<Record<string, number>>((acc, x) => {
//         const s = x.split(': ');

//         acc[s[0].replace(' ', '_').toLowerCase()] = parseInt(s[1]);
//         return acc;
//     }, {}) as unknown as Player;

//     const basePlayer: Player = {
//         hit_points: 50,
//         mana: 500,
//         damage: 0,
//     };

//     const [player, loadout] = findWinner(basePlayer, boss);

//     return {value: loadout.cost, boss, player, loadout};
// });

