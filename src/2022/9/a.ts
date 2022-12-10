import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';

aoc((infile) => {

    const input = infile.tokenLines.map((x) => ({
        move: x[0],
        dist: parseInt(x[1])
    }));
    
    const tailPositions = new Set<string>();
    const start = new Point(0,0);
    let head = start;
    let tail = start;
    tailPositions.add(tail.key);

    for (const m of input) {
        for(let i = 0; i < m.dist; i++) {
            if (m.move === 'U') {
                head = new Point(head.x, head.y+1);
            }
            if (m.move === 'D') {
                head = new Point(head.x, head.y-1);
            }
            if (m.move === 'L') {
                head = new Point(head.x-1, head.y);
            }
            if (m.move === 'R') {
                head = new Point(head.x+1, head.y);
            }

            if (Math.abs(head.y - tail.y) > 1 || Math.abs(head.x - tail.x) > 1) {
                const xDiff = Math.min(1, Math.max(-1, head.x - tail.x));
                const yDiff = Math.min(1, Math.max(-1, head.y - tail.y));
                tail = new Point(tail.x + xDiff, tail.y + yDiff);
                tailPositions.add(tail.key);
            }
        }
    }
    
    return {value: tailPositions.size};
});