import { aoc } from '../../ts-utils/aoc';

const hash = (str: string): number => {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        result = ((result + str.charCodeAt(i)) * 17) % 256;
    }
    return result;
};

aoc((infile) => {
    const value = infile.lines
        .flatMap((x) => x.split(','))
        .reduce((acc, v) => acc + hash(v), 0);

    return { value };
});
