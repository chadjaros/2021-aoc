import { aoc } from '../../utils/aoc';
import { aStar } from '../../utils/find-path';
import { SimpleGraph } from '../../utils/graph';
import { Player, State } from './model';


aoc((infile) => {
    const boss = infile.lines
        .reduce<Record<string, number>>((acc, x) => {
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

    const graph = new SimpleGraph<State>();
    const startState = new State(
        graph,
        basePlayer,
        boss,
        new Map(),
        0,
        undefined,
        1,
        false
    );
    graph.setNode(startState);

    const result = aStar(
        startState,
        (state: State) => state.winner,
        (state: State) => state.boss.hit_points,
        graph
    );
    
    for(const p of result?.path ?? []) {
        console.log(`${p.turn} -  ph:${p.p.hit_points} pm:${p.p.mana} s:${p.lastCast?.name} c:${p.lastCast?.cost} b:${p.boss.hit_points}`);
    }

    return {
        value: result?.cost ?? -1
    };
});

