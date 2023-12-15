import { aoc } from '../../ts-utils/aoc';
import { ArrayUtils } from '../../ts-utils/array-utils';
import { Series } from '../../ts-utils/series';

interface Cmd {
    label: string;
    op: string;
    fl?: number;
}

const hash = (str: string): number => {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        result = ((result + str.charCodeAt(i)) * 17) % 256;
    }
    return result;
};

const regex = /(\w+)([=-])(\d+)?/;

aoc((infile) => {
    const commands = infile.lines
        .flatMap((x) => x.split(','))
        .map((v) => {
            const matches = v.match(regex)!;
            const label = matches[1];
            const op = matches[2];
            const fl = op === '=' ? parseInt(matches[3]) : undefined;

            return { label, op, fl };
        });

    const buckets = Array.from(Series.until(0, 256)).map<Cmd[]>((_) => []);

    for (const cmd of commands) {
        const bucketNum = hash(cmd.label);
        const idxof = buckets[bucketNum].findIndex((x) => x.label === cmd.label);
        if (cmd.op === '-') {
            if (idxof >= 0) {
                buckets[bucketNum] = ArrayUtils.removeIndex(buckets[bucketNum], idxof);
            }
        }
        else {
            if (idxof >= 0) {
                buckets[bucketNum][idxof].fl = cmd.fl;
            }
            else {
                buckets[bucketNum].push(cmd);
            }
        }
    }

    const value = buckets.reduce((acc, box, boxIdx) => {
        return acc + box.reduce((acc, ln, lnIdx) => {
            return acc + ((boxIdx + 1) * (lnIdx + 1) * ln.fl!);
        }, 0);
    }, 0);
    return { value };
});
