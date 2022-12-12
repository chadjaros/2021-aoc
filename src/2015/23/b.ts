import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.splitLines(/,? /)
        .map((l) => {
            const p1 = parseInt(l[1]);
            const p2 = parseInt(l[2]);
            return {
                ins: l[0],
                p1: isNaN(p1) ? l[1] : p1,
                p2: l[2] === undefined ? undefined : (isNaN(p2) ? l[2] : p2)
            };
        });

    const registers = new Map([['a', 1], ['b', 0]]);


    let idx = 0;
    while (idx >= 0 && idx < input.length) {
        const ins = input[idx];

        switch (ins.ins) {
            case 'inc': {
                const r = ins.p1 as string;
                registers.set(r, registers.get(r)! + 1);
                idx++;
                break;
            }
            case 'hlf': {
                const r = ins.p1 as string;
                registers.set(r, registers.get(r)! / 2);
                idx++;
                break;
            }
            case 'tpl':{
                const r = ins.p1 as string;
                registers.set(r, registers.get(r)!  * 3);
                idx++;
                break;
            }
            case 'jmp':{
                idx += ins.p1 as number;
                break;
            }
            case 'jie':{
                const r = ins.p1 as string;
                if (registers.get(r)! % 2 === 0) {
                    idx += ins.p2 as number;
                }                
                else {
                    idx++;
                }
                break;
            }
            case 'jio':{
                const r = ins.p1 as string;
                if (registers.get(r)! === 1) {
                    idx += ins.p2 as number;
                }                
                else {
                    idx++;
                }
                break;
            }
        }
    }

    return {value: registers.get('b')!};
});