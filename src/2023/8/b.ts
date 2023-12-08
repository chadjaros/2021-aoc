import { aoc } from '../../ts-utils/aoc';
import { Factor } from '../../ts-utils/factor';

aoc((infile) => {
    const lines = infile.lines;

    const regex = /(\w{3}) = \((\w{3}), (\w{3})\)/;
    const instructions = lines[0].split('');
    const map = new Map(lines.slice(2).map((_) => {
        const extracts = _.match(regex);
        if (!extracts) {
            throw new Error(_);
        }
        return [
            extracts[1],
            {
                left: extracts[2],
                right: extracts[3]
            }
        ];
    }));

    const locations = Array.from(map.entries()).filter((_) => _[0].endsWith('A')).map((_) => _[0]);

    function dist(start: string): number {
        let value = 0;
        let location = start;
        let instIndex = 0;
        while (!location.endsWith('Z')) {
            const inst = instructions[instIndex];

            const next = map.get(location)!;

            if (inst === 'L') {
                location = next.left;
            }
            else {
                location = next.right;
            }

            value++;
            instIndex++;
            if (instIndex >= instructions.length) {
                instIndex = 0;
            }
        }
        return value;
    }

    const dists = locations.map((_) => dist(_));

    return { value: Factor.leastCommonMultiple(dists) };
});
