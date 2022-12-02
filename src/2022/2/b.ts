import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

aoc(() => {
    const input = readFileSync(__dirname + '/input.txt').toString()
        .split('\n').map((x) => x.split(' '));

    // A = Rock, B = Paper, C = Scissors
    // X = Lose, X = Draw, Z = Win
    let value = 0;
    for (const line of input) {

        const opp = line[0];
        const result = line[1];

        let me = 'A';

        if (result === 'Y') {
            value += 3;
            me = opp;
        }
        else if (result === 'Z') {
            value += 6;
            if (opp === 'A') {
                me = 'B';
            }
            else if (opp === 'B') {
                me = 'C';
            }
            else {
                me = 'A';
            }
        }
        else {
            if (opp === 'A') {
                me = 'C';
            }
            else if (opp === 'B') {
                me = 'A';
            }
            else {
                me = 'B';
            }
        }

        if (me === 'A') {
            value += 1;
        }
        else if (me === 'B') {
            value += 2;
        }
        else {
            value += 3;
        }
    }

    return {
        value
    };
});