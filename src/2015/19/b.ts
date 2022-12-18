import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const raw = infile.lines;

    let maxSrcLength = 0;
    const replacements = raw.slice(0, -2)
        .map((line) => line.split(' => '))
        .reduce((accum, value) => {
            if (!accum.has(value[1])) {
                accum.set(value[1], new Set());
                if (maxSrcLength < value[1].length) {
                    maxSrcLength = value[1].length;
                }
            }
            accum.get(value[1])?.add(value[0]);
            return accum;
        }, new Map<string, Set<string>>());


    const sortedReplacments = Array.from(replacements.entries())
        .map((x) => ({src: x[0], rep: Array.from(x[1])[0]}))
        .sort((a, b) => {
            if (b.rep === 'e' && a.rep !== 'e') {
                return -1;
            }
            if (a.rep === 'e' && b.rep !== 'e') {
                return 1;
            }
            return b.src.length - a.src.length;
        });
    const molecule = raw[raw.length - 1];

    let progress = molecule;
    let counter = 0;

    while (progress !== 'e') {
        const rep = sortedReplacments.find((x) => progress.includes(x.src));
        if (!rep) {
            break;
        }
        while (progress.includes(rep.src)) {
            progress = progress.replace(rep.src, rep.rep);
            counter++;
        }
    }

    return {value: counter, progress};
});
