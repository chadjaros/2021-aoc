import { aoc } from '../../ts-utils/aoc';

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

    let location = 'AAA';
    let value = 0;

    let instIndex = 0;
    while (location !== 'ZZZ') {

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

    return { value };
});
