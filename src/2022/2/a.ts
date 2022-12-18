import { aoc } from '../../utils/aoc';

aoc((infile) => {
    const input = infile.lines.map((x) => x.split(' '));

    // A = Rock, B = Paper, C = Scissors
    // X = Rock, Y = Paper, Z = Scissors
    let value = 0;
    for (const line of input) {

        const opp = line[0];
        let me = line[1];

        if (me === 'X') {
            me = 'A';
        }
        else if (me === 'Y') {
            me = 'B';
        }
        else me = 'C';

        if (me === 'A') {
            value += 1;
        }
        else if (me === 'B') {
            value += 2;
        }
        else {
            value += 3;
        }

        if (opp === me) {
            value += 3;
        }
        else if (opp === 'A' && me === 'B') {
            value += 6;
        }
        else if (opp === 'B' && me === 'C') {
            value += 6;
        }
        else if (opp === 'C' && me === 'A') {
            value += 6;
        }
    }

    return {
        value
    };
});