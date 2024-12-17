import { aoc } from '../../ts-utils/aoc';
import { BoundingBox2, Point } from '../../ts-utils/point-2d';
import { findGridFill } from '../../ts-utils/simple-fill';

aoc((infile) => {
    const input = infile.grid();

    const visited = new Set<string>();

    const value = input.reduce((acc, _, point) => {
        if (visited.has(point.key)) {
            return acc;
        }

        const group = findGridFill(input, point, (v) => v === _);
        group.forEach((p) => visited.add(p.key));

        const groupList = [...group.values()];

        const { minX, minY, maxX, maxY } = groupList.reduce((acc, _) => {
            if (_.x < acc.minX) {
                acc.minX = _.x;
            }
            if (_.x > acc.maxX) {
                acc.maxX = _.x;
            }
            if (_.y < acc.minY) {
                acc.minY = _.y;
            }
            if (_.y > acc.maxY) {
                acc.maxY = _.y;
            }
            return acc;
        }, ({ minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }));

        // check tops and bottoms
        let sides = 0;

        for (let y = minY; y <= maxY; y++) {
            let trackingSideTop = false;
            let trackingSideBot = false;
            for (let x = minX; x <= maxX; x++) {
                const pt = new Point(x, y);
                {
                    const up = new Point(x, y - 1);
                    if (group.has(pt.key) && !group.has(up.key)) {
                        trackingSideTop = true;

                    }
                    else if (trackingSideTop) {
                        trackingSideTop = false;
                        sides++;
                    }
                }
                {
                    const down = new Point(x, y + 1);
                    if (group.has(pt.key) && !group.has(down.key)) {
                        trackingSideBot = true;
                    }
                    else if (trackingSideBot) {
                        trackingSideBot = false;
                        sides++;
                    }
                }
            }
            sides += (trackingSideTop ? 1 : 0) + (trackingSideBot ? 1 : 0);
        }

        // check lefts and rights

        for (let x = minX; x <= maxX; x++) {
            let trackingSideRt = false;
            let trackingSideLt = false;
            for (let y = minY; y <= maxY; y++) {
                const pt = new Point(x, y);
                {
                    const rt = new Point(x + 1, y);
                    if (group.has(pt.key) && !group.has(rt.key)) {
                        trackingSideRt = true;
                    }
                    else if (trackingSideRt) {
                        trackingSideRt = false;
                        sides++;
                    }
                }
                {
                    const lt = new Point(x - 1, y);
                    if (group.has(pt.key) && !group.has(lt.key)) {
                        trackingSideLt = true;
                    }
                    else if (trackingSideLt) {
                        trackingSideLt = false;
                        sides++;
                    }
                }
            }
            sides += (trackingSideRt ? 1 : 0) + (trackingSideLt ? 1 : 0);
        }

        return acc + group.size * sides;
    }, 0);

    return { value };
});
