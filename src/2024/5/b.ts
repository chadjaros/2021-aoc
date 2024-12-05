import { reverse } from 'dns';
import { aoc } from '../../ts-utils/aoc';
import { intersection } from '../../ts-utils/set-math';

type OrderIdx = Map<number, Set<number>>;

aoc((infile) => {
    const tuples: number[][] = [];

    const updates = infile.lines.filter((_) => {
        if (_.includes(',')) {
            return true;
        }
        if (_.includes('|')) {
            tuples.push(_.split('|').map((i) => parseInt(i)));
        }
        return false;
    }).map((_) =>
        _.split(',').map((i) => parseInt(i))
    );

    const orderings = tuples.reduce((acc, _) => {
        if (!acc.fwd.has(_[0])) {
            acc.fwd.set(_[0], new Set());
        }
        acc.fwd.get(_[0])!.add(_[1]);

        if (!acc.rev.has(_[1])) {
            acc.rev.set(_[1], new Set());
        }
        acc.rev.get(_[1])!.add(_[0]);

        return acc;
    }, { fwd: new Map() as OrderIdx, rev: new Map() as OrderIdx });

    const value = updates.filter((_) => {
        const infront = new Set(_);
        const behind = new Set();

        for (let i = 0; i < _.length; i++) {
            const val = _[i];
            infront.delete(val);

            if (orderings.fwd.get(val) && intersection(orderings.fwd.get(val)!, behind).size > 0) {
                return true;
            }
            if (orderings.rev.get(val) && intersection(orderings.rev.get(val)!, infront).size > 0) {
                return true;
            }

            behind.add(val);
        }

        return false;
    }).reduce((acc, _) => {

        _.sort((a, b) => {
            if (orderings.fwd.get(a)?.has(b) || orderings.rev.get(b)?.has(a)) {
                return -1;
            }
            if (orderings.fwd.get(b)?.has(a) || orderings.rev.get(a)?.has(b)) {
                return 1;
            }
            return 0;
        });

        return acc + _[Math.floor(_.length / 2)];
    }, 0);

    return { value };
});
