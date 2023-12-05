import { Range } from '../../ts-utils/range';
import { aoc, AocInputFileHelper } from '../../ts-utils/aoc';

aoc((infile) => {
    const lines = infile.lines;
    const seedVals = lines[0]
        .split(': ')[1]
        .split(' ')
        .map((_) => parseInt(_));

    const seeds: Range[] = [];
    for (let i = 0; i < seedVals.length; i += 2) {
        seeds.push(new Range(seedVals[i], seedVals[i] + seedVals[i + 1] - 1));
    }

    const mapRegex = /(\w+)-to-(\w+) map:/;
    const maps = lines.slice(2).reduce(
        (acc, line) => {
            if (line === '') {
                return acc;
            }
            const mapEntry = line.match(mapRegex);
            if (mapEntry) {
                acc.push({
                    from: mapEntry[1],
                    to: mapEntry[2],
                    ranges: [],
                });
                return acc;
            }

            const r = line.split(' ').map((_) => parseInt(_));
            const last = acc[acc.length - 1];
            last.ranges.push({
                destStart: r[0],
                src: new Range(r[1], r[1] + r[2] - 1),
            });
            return acc;
        },
        [] as {
            from: string;
            to: string;
            ranges: { destStart: number; src: Range }[];
        }[]
    );

    maps.forEach((_) => {
        _.ranges.sort((a, b) => a.src.start - b.src.start);
    });

    const goTo = (ranges: Range[], from: string, end: string): Range[] => {
        if (from === end) {
            return ranges;
        }

        const map = maps.find((_) => _.from === from)!;
        const update = ranges.flatMap((range) => {
            const overlaps = map.ranges.filter((r) => range.overlaps(r.src))!;
            if (overlaps.length === 0) {
                return range;
            }

            const updates: Range[] = [];

            let cursor = range.start;
            let overlapIdx = 0;
            do {
                const overlap = overlaps[overlapIdx];
                if (!overlap) {
                    updates.push(new Range(cursor, range.end));
                    cursor = range.end + 1;
                } else if (overlap.src.includes(cursor)) {
                    const newStart =
                        overlap.destStart + cursor - overlap.src.start;
                    const newLen = Math.min(
                        overlap.src.end - cursor,
                        range.end - cursor
                    );

                    updates.push(new Range(newStart, newStart + newLen));
                    cursor = overlap.src.end + 1;
                    overlapIdx++;
                } else {
                    updates.push(new Range(cursor, overlap.src.start - 1));
                    cursor = overlap.src.start;
                }
            } while (range.includes(cursor));

            return updates;
        });

        update.sort((a, b) => a.start - b.start);
        return goTo(update, map.to, end);
    };

    const result = goTo(seeds, 'seed', 'location');

    return {
        value: result[0].start,
    };
});
