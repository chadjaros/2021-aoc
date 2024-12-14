import { AdvMath } from '../../ts-utils/adv-math';
import { aoc } from '../../ts-utils/aoc';

interface System {
    xA: bigint;
    yA: bigint;
    xB: bigint;
    yB: bigint;
    xP: bigint;
    yP: bigint;
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
            xA: parseInt(ma[1]),
            xB: parseInt(mb[1]),
            xP: 10000000000000 + parseInt(mp[1]),
            yA: parseInt(ma[2]),
            yB: parseInt(mb[2]),
            yP: 10000000000000 + parseInt(mp[2]),
        };
    });

    const _ = input[0];
    const value = input.reduce((acc, _) => {
        const lcmA = BigInt(AdvMath.lcm([_.xA, _.yA]));
        const working: System = {
            xA: lcmA,
            xB: lcmA / BigInt(_.xA) * BigInt(_.xB),
            xP: lcmA / BigInt(_.xA) * BigInt(_.xP),
            yA: lcmA,
            yB: lcmA / BigInt(_.yA) * BigInt(_.yB),
            yP: lcmA / BigInt(_.yA) * BigInt(_.yP),
        };

        const bVal = Number(working.xP - working.yP) / Number(working.xB - working.yB);
        const aVal = (_.xP - (bVal * _.xB)) / _.xA;

        if (Math.floor(aVal) === aVal) {
            return acc + aVal * 3 + bVal;
        }

        return acc;
    }, 0);

    return { value };
});
