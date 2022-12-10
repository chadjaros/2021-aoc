import { aoc } from '../../utils/aoc';
import { Series } from '../../utils/series';

aoc((infile) => {

    const input = infile.tokenLines.map((x) => {
        return {
            inst: x[0],
            val: x.length > 1 ? parseInt(x[1]) : undefined
        };
    });

    let register = 1;
    let cycles = 0;

    const screen = Array.from(Series.generated(6, () => Array.from(Series.of(40, ' '))));

    const incCycle = () => {
        const y = Math.floor(cycles / 40);
        const x = cycles % 40;
        cycles++;
        if (x >= register -1 && x <= register + 1) {
            screen[y][x] = '#';
        }
    };

    for (const i of input) {
        if (i.inst === 'noop') {
            incCycle();
        }
        else if (i.inst === 'addx') {
            incCycle();
            incCycle();
            register += i.val ?? 0;
        }
    }

    console.log('---');
    for(const line of screen) {
        console.log(line.join(''));
    }

    return {
        value: 0,
    };
});