import { AdvMath } from '../../ts-utils/adv-math';
import { aoc } from '../../ts-utils/aoc';

interface System {
    xA: number;
    yA: number;
    xB: number;
    yB: number;
    xP: number;
    yP: number;
}

aoc((infile) => {

    const butReg = /X\+(\d+), Y\+(\d+)/;
    const prizeReg = /X=(\d+), Y=(\d+)/;

    const input = infile.string.split('\n\n').map((_) => {
        const lines = _.split('\n');
        const ma = lines[0].match(butReg)!;
        const mb = lines[1].match(butReg)!;
        const mp = lines[2].match(prizeReg)!;
        return {
            xA: parseInt(ma[1]), yA: parseInt(ma[2]),
            xB: parseInt(mb[1]), yB: parseInt(mb[2]),
            xP: parseInt(mp[1]), yP: parseInt(mp[2]),
        };
    });

    const checkCombo = (system: System): number => {
        let options: { a: number, b: number; }[] = [];
        for (let a = 0; a < 100; a++) {
            for (let b = 0; b < 100; b++) {
                if (a * system.xA + b * system.xB === system.xP) {
                    options.push({ a, b });
                }
            }
        }
        options = options.filter((_) => _.a * system.yA + _.b * system.yB === system.yP);
        const costs = options.map((_) => _.a * 3 + _.b);

        return costs.length > 0 ? Math.min(...costs) : 0;
    };

    const value = input.map((_) => {
        return checkCombo(_);
    })
        .filter((_) => _ !== Infinity)
        .reduce((acc, _) => acc + _, 0);
    return { value };
});
