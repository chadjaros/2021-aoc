import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';
import { Series } from '../../utils/series';

aoc((infile) => {

    const input = infile.tokenLines.map((x) => ({
        move: x[0],
        dist: parseInt(x[1])
    }));
    
    const tailPositions = new Set<string>();
    const start = new Point(0,0);
    const knots: Point[] = [...Series.of(10, start)];
    tailPositions.add(start.key);

    for (const m of input) {
        for(let i = 0; i < m.dist; i++) {
            const head = knots[0];
            if (m.move === 'U') {
                knots[0] = new Point(head.x, head.y+1);
            }
            if (m.move === 'D') {
                knots[0] = new Point(head.x, head.y-1);
            }
            if (m.move === 'L') {
                knots[0] = new Point(head.x-1, head.y);
            }
            if (m.move === 'R') {
                knots[0] = new Point(head.x+1, head.y);
            }

            for (let i = 1; i < knots.length; i++) {
                const lead = knots[i-1];
                const curr = knots[i];
                if (Math.abs(lead.y - curr.y) > 1 || Math.abs(lead.x - curr.x) > 1) {
                    const xDiff = Math.min(1, Math.max(-1, lead.x - curr.x));
                    const yDiff = Math.min(1, Math.max(-1, lead.y - curr.y));
                    knots[i] = new Point(curr.x + xDiff, curr.y + yDiff);
                    if (i === knots.length - 1) {
                        tailPositions.add(knots[i].key);
                    }
                }
    
            }
        }
    }
    
    return {value: tailPositions.size};
});