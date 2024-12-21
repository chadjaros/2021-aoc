import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const input = infile.sample().lines;

    const options = input[0].split(', ');
    const designs = input.slice(2);

    const dfs = (s: string): boolean => {
        if (s === '') {
            return true;
        }
        const matches = options.filter((_) => s.startsWith(_));
        return matches.some((_) => dfs(s.slice(_.length)));
    };

    const paths = (s: string): number => {
        if (s === '') {
            return 1;
        }
        const matches = options.filter((_) => s.startsWith(_));
        if (matches.length === 0) {
            return 0;
        }
        return matches.reduce((acc, m) => {
            return acc + paths(s.slice(m.length));
        }, 0);
    };

    const value = designs.filter((_) => {
        return dfs(_);
    }).reduce((acc, _) => {
        console.log(_, acc);
        return acc + paths(_);
    }, 0);
    return { value };
});
