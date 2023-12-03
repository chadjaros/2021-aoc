import { aoc } from '../../ts-utils/aoc';
import { Point3 } from '../../ts-utils/point-3d';

aoc((infile) => {
    const input = infile
        // .sample()
        .splitLinesAndMap(',', (x) => parseInt(x))
        .map((x) => new Point3(x));

    let min = new Point3([Infinity, Infinity, Infinity]);
    let max = new Point3([-Infinity, -Infinity, -Infinity]);

    input.forEach((p) => {
        if (p.x < min.x) {
            min = new Point3([p.x, min.y, min.z]);
        }
        if (p.y < min.y) {
            min = new Point3([min.x, p.y, min.z]);
        }
        if (p.z < min.z) {
            min = new Point3([min.x, min.y, p.z]);
        }
        if (p.x > max.x) {
            max = new Point3([p.x, max.y, max.z]);
        }
        if (p.y > max.y) {
            max = new Point3([max.x, p.y, max.z]);
        }
        if (p.z > max.z) {
            max = new Point3([max.x, max.y, p.z]);
        }
    });

    const rockBits = new Set(input.map((x) => x.key));
    const contained = new Set<string>();
    const outside = new Set<string>();
    function isOutside(p: Point3): boolean {
        if (rockBits.has(p.key)) {
            return false;
        }
        if (contained.has(p.key)) {
            return false;
        }

        const frontier: Point3[] = [p];
        const frontierSet = new Set<string>();
        const visited: Set<string> = new Set();

        while (frontier.length > 0) {
            const point = frontier.pop()!;
            frontierSet.delete(point.key);

            visited.add(point.key);

            if (outside.has(point.key)) {
                visited.forEach((x) => outside.add(x));
                return true;
            }

            if (
                point.x > max.x ||
                point.y > max.y ||
                point.z > max.z ||
                point.y < min.x ||
                point.y < min.y ||
                point.z < min.z
            ) {
                visited.forEach((x) => outside.add(x));
                return true;
            }

            const adjacents = point
                .adjacents(false)
                .filter(
                    (x) =>
                        !visited.has(x.key) &&
                        !rockBits.has(x.key) &&
                        !frontierSet.has(x.key)
                );

            adjacents.forEach((x) => frontierSet.add(x.key));
            frontier.unshift(...adjacents);
        }

        visited.forEach((x) => contained.add(x));

        return false;
    }

    const value = input.reduce((acc, v) => {
        return acc + v.adjacents(false).filter(isOutside).length;
    }, 0);

    return {
        value,
    };
});
