import { aoc } from '../../utils/aoc';

interface Monkey {
    holding: number[];
    op: (value: number) => number;
    divisible: number;
    ifTrueTarget: number;
    ifFalseTarget: number;
    timesInspected: 0;
}


aoc((infile) => {

    const input = infile.tokenLines;

    const monkeys: Monkey[] = [];

    for (const l of input) {
        if (l.length < 2) {
            continue;
        }

        const last = monkeys.length - 1;
        
        if (l[0] === 'Monkey') {
            monkeys.push({
                holding: [],
                op: (v) => v,
                divisible: 0,
                ifTrueTarget: 0,
                ifFalseTarget: 0,
                timesInspected: 0,
            });
        } 
        else if (l[1] === 'Starting') {
            monkeys[last].holding = l.slice(3)
                .map((x) => parseInt(x));
        }
        else if (l[1] === 'Operation:') {

            if (l[5] === '+') {
                if (l[6] === 'old') {
                    monkeys[last].op = (value) => value + value;
                }
                else {
                    monkeys[last].op = (value) => value + parseInt(l[6]);
                }
            }
            else {
                if (l[6] === 'old') {
                    monkeys[last].op = (value) => value * value;
                }
                else {
                    monkeys[last].op = (value) => value * parseInt(l[6]);
                }
            }
        }
        else if (l[1] === 'Test:') {
            monkeys[last].divisible = parseInt(l[4]);
        }
        else if (l[2] === 'true:') {
            monkeys[last].ifTrueTarget = parseInt(l[6]);
        }
        else if (l[2] === 'false:') {
            monkeys[last].ifFalseTarget = parseInt(l[6]);
        }
    }

    for (let round = 0; round < 20; round++) {
        for (let mi = 0; mi < monkeys.length; mi++) {
            const m = monkeys[mi];
            while(m.holding.length > 0) {
                m.timesInspected++;
                let value = m.holding.shift()!;
                value = m.op(value);
                value = Math.floor(value / 3);
                if (value % m.divisible === 0) {
                    // console.log(mi, v, value, 'true', m.ifTrueTarget);
                    monkeys[m.ifTrueTarget].holding.push(value);
                }
                else {
                    // console.log(mi, v, value, 'false', m.ifFalseTarget);
                    monkeys[m.ifFalseTarget].holding.push(value);
                }
            }
        }
    }

    const sorted = monkeys.map((m) => m.timesInspected).sort((a, b) => b - a);

    // console.log(monkeys);
    return {
        value: sorted[0] * sorted[1], sorted
    };
});
