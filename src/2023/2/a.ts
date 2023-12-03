import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {
    const limits = new Map([
        ['blue', 14],
        ['green', 13],
        ['red', 12],
    ]);

    const value = infile.lines
        .map((line) => {
            const splits = line.split(': ');

            const grabs = splits[1].split('; ')
                .map((g) => {
                    return g.split(', ')
                        .map((p) => {
                            const parts = p.split(' ');
                            return {
                                color: parts[1],
                                ct: parseInt(parts[0])
                            };
                        });
                });

            return {
                game: parseInt(splits[0].substring(5)),
                grabs
            };
        })
        .filter((game) => {
            for (const grab of game.grabs) {
                for (const color of grab) {
                    if (color.ct > (limits.get(color.color) ?? 0)) {
                        return false;
                    }
                }
            }
            return true;
        })
        .reduce((acc, game) => {
            return acc + game.game;
        }, 0);

    return { value };
});
