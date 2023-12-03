import { aoc } from '../../ts-utils/aoc';

aoc((infile) => {

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
        .reduce((acc, game) => {
            const mins = new Map([
                ['blue', 0],
                ['green', 0],
                ['red', 0],
            ]);


            for (const group of game.grabs) {
                for (const color of group) {
                    if (mins.get(color.color)! < color.ct) {
                        mins.set(color.color, color.ct);
                    }
                }
            }

            return acc + (Array.from(mins.values()).reduce((acc, x) => acc * x, 1));
        }, 0);

    return { value };
});
