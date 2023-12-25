import { aoc } from '../../ts-utils/aoc';
import { BoundingBox3 } from '../../ts-utils/point-3d';
import { ArrayUtils } from '../../ts-utils/array-utils';

interface StackNode {
    bbox: BoundingBox3;
    supportedBy: string[];
    supports: string[];
}

aoc((infile) => {
    const boxes = infile.lines.map((line) => {
        const coords = line.split('~').flatMap((_) => _.split(',').map((_2) => parseInt(_2))) as [number, number, number, number, number, number];
        return BoundingBox3.fromCoordinates(...coords);
    });
    boxes.sort((a, b) => a.max.z - b.max.z);

    const biggest = boxes.reduce((acc, b) => Math.max(acc, ...[b.max.x, b.max.y, b.max.z, b.min.x, b.min.y, b.min.z].map((_) => Math.abs(_))), 0);
    const base = BoundingBox3.fromCoordinates(-biggest, -biggest, 0, biggest, biggest, 0);

    const stack: StackNode[] = [{ bbox: base, supportedBy: [], supports: [] }];
    for (const box of boxes) {
        const proj = box.xyProjection();
        const matches = stack.reduceRight<StackNode[]>((acc, st) => {
            const maxHeight = acc[0]?.bbox.max.z ?? -1;
            if (st.bbox.xyProjection().pointsIntersect(proj)) {
                if (st.bbox.max.z > maxHeight) {
                    return [st];
                }
                else if (st.bbox.max.z === maxHeight) {
                    acc.push(st);
                }
            }
            return acc;
        }, []);

        const maxHeight = matches[0].bbox.max.z;
        const adjustZ = maxHeight - box.min.z + 1;
        const bbox = BoundingBox3.fromCoordinates(
            box.min.x,
            box.min.y,
            box.min.z + adjustZ,
            box.max.x,
            box.max.y,
            box.max.z + adjustZ
        );
        stack.push({
            bbox,
            supportedBy: matches.map((_) => _.bbox.key),
            supports: [],
        });
        matches.forEach((_) => _.supports.push(bbox.key));
    }

    const stackMap = new Map(stack.map((_) => [_.bbox.key, _]));
    const value = ArrayUtils.tail(stack).filter((box) => {
        return box.supports.map((_) => stackMap.get(_)!).every((_) => _.supportedBy.length > 1);
    }).length;
    return { value };
});
