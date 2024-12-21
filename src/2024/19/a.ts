import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.lines;

    const options = input[0].split(', ');
    const designs = input.slice(2);

    const dfs = (s: string): boolean => {
        if (s === '') {
            return true;
        }
        const matches = options.filter((_) => s.startsWith(_));
        return matches.some((_) => dfs(s.slice(_.length)));
    };

    const value = designs.filter((_) => {
        return dfs(_);
    }).length;
    return { value };
});
