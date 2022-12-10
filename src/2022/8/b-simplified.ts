import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';

aoc((infile) => {
    let value = 0;

    const input = infile.grid('', (x) => parseInt(x));
   
    input.forEach((tree: number, point: Point) => {

        if (input.isEdge(point)) {
            return;
        }

        let fromleft = 0;
        let fromright = 0;
        let fromtop = 0;
        let frombottom = 0;
        input.scanDecXFrom(point, (v) => {
            fromleft++;
            if (v >= tree) {
                return true;
            }
        });
        input.scanIncXFrom(point, (v) => {
            fromright++;
            if (v >= tree) {
                return true;
            }
        });
        input.scanDecYFrom(point, (v) => {
            fromtop++;
            if (v >= tree) {
                return true;
            }
        });
        input.scanIncYFrom(point, (v) => {
            frombottom++;
            if (v >= tree) {
                return true;
            }
        });

        const dist = fromtop * frombottom * fromleft * fromright;
        if (dist > value) {
            value = dist;
        }
    });

    return {value};
});