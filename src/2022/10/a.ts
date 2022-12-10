import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.tokenLines.map((x) => {
        return {
            inst: x[0],
            val: x.length > 1 ? parseInt(x[1]) : undefined
        };
    });

    let value = 0;

    let register = 1;
    let cycles = 0;

    const incCycle = () => {
        cycles++;
        if ((cycles - 20)%40 === 0) {
            value += cycles * register;
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

    return {
        value,
    };
});