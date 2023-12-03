/* eslint-disable @typescript-eslint/indent */
import { aoc } from '../../ts-utils/aoc';

const Ore = 'ore';
const Clay = 'clay';
const Obsidian = 'obsidian';
const Geode = 'geode';

interface Blueprint {
    id: number;
    costs: Map<string, { res: string; ct: number }[]>;
    maxBots: Map<string, number>;
}

aoc((infile) => {
    const input = infile// .sample()
        .tokenLines
        .slice(0, 3)
        .map<Blueprint>((l) => {
            const costs = new Map([
                [
                    Geode,
                    [
                        { res: Ore, ct: parseInt(l[27]) },
                        { res: Obsidian, ct: parseInt(l[30]) },
                    ],
                ],
                [
                    Obsidian,
                    [
                        { res: Ore, ct: parseInt(l[18]) },
                        { res: Clay, ct: parseInt(l[21]) },
                    ],
                ],
                [Clay, [{ res: Ore, ct: parseInt(l[12]) }]],
                [Ore, [{ res: Ore, ct: parseInt(l[6]) }]],
            ]);
            return {
                id: parseInt(l[1].replace(':', '')),
                costs,
                maxBots: Array.from(costs).reduce(
                    (acc, [bot, costs]) => {
                        for (const c of costs) {
                            if (acc.get(c.res)! < c.ct) {
                                acc.set(c.res, c.ct);
                            }
                        }
                        return acc;
                    },
                    new Map([
                        [Ore, 0],
                        [Clay, 0],
                        [Obsidian, 0],
                    ])
                ),
            };
        });

    function assessBlueprint(blueprint: Blueprint): number {
        const bestBot = new Map<number, number>();

        function search(
            resources: Map<string, number> = new Map([
                [Ore, 0],
                [Clay, 0],
                [Obsidian, 0],
                [Geode, 0],
            ]),
            bots: Map<string, number> = new Map([
                [Ore, 1],
                [Clay, 0],
                [Obsidian, 0],
                [Geode, 0],
            ]),
            building: string | undefined = undefined,
            lastPossibles: Set<string> = new Set(),
            time = 32
        ): number {
            if (time === 0) {
                // console.log('b', blueprint.id, 'res', Array.from(resources.entries()).join(','), 'bots', Array.from(bots.entries()).join(','));
                return resources.get(Geode)!;
            }

            for (const [res, ct] of bots) {
                resources.set(res, resources.get(res)! + ct);
            }

            if (building) {
                bots.set(building, bots.get(building)! + 1);
            }

            const gbot = bots.get(Geode)!;
            if (gbot + 1 < (bestBot.get(time) ?? 0)) {
                return -1;
            }
            if (gbot + 1 > (bestBot.get(time) ?? 0)) {
                bestBot.set(time, gbot);
            }

            let purchases: (string | undefined)[] = [];
            if (
                blueprint.costs
                    .get(Geode)!
                    .every((c) => resources.get(c.res)! >= c.ct)
            ) {
                purchases = [Geode];
            } else if (
                blueprint.costs
                    .get(Obsidian)!
                    .every((c) => resources.get(c.res)! >= c.ct)
            ) {
                purchases = [Obsidian];
            } else {
                purchases = [
                    ...[Clay, Ore].filter(
                        (p) =>
                            !lastPossibles.has(p) &&
                            bots.get(p)! < blueprint.maxBots.get(p)! &&
                            blueprint.costs
                                .get(p)!
                                .every((c) => resources.get(c.res)! >= c.ct)
                    ),
                    undefined,
                ];
            }

            return purchases.reduce((acc, purchase) => {
                const nextResources = new Map(resources);
                if (purchase) {
                    for (const c of blueprint.costs.get(purchase)!) {
                        nextResources.set(
                            c.res,
                            nextResources.get(c.res)! - c.ct
                        );
                    }
                }

                const result = search(
                    nextResources,
                    new Map(bots),
                    purchase,
                    purchase === undefined
                        ? (new Set(purchases) as Set<string>)
                        : new Set(),
                    time - 1
                );

                return result > acc ? result : acc;
            }, -Infinity);
        }

        const result = search();

        console.log('blueprint', blueprint.id, result);

        return result;
    }

    const value = input.reduce((acc, v) => acc * assessBlueprint(v), 1);

    return { value };
});

// 1614 too low
