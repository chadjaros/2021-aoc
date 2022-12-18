import { aoc } from '../../utils/aoc';
import { Point } from '../../utils/point-2d';

class Shape {
    public root: Point;
    public relativePoints: Point[];

    get points(): Point[] {
        return this.relativePoints.map((p) => this.root.plus(p));
    }

    movePoints(n: number): Point[] {
        return this.relativePoints.map((p) => this.root.plus(new Point(n, 0).plus(p)));
    }

    get downPoints(): Point[] {
        return this.relativePoints.map((p) => this.root.plus(new Point(0, -1).plus(p)));
    }

}

aoc((infile) => {
    const input = infile.string;

    let moveIdx = 0;
    function getMove(): number {
        const m = input[moveIdx];
        moveIdx++;
        if (moveIdx === input.length) {
            moveIdx = 0;
        }
        return m === '>' ? 1 : -1;
    }

    let shapeIdx = 0;
    function createShape(): Shape {
        const result = new Shape();
        result.root = new Point(2, 0);
        switch(shapeIdx) {
            case 0:
                result.relativePoints = [
                    new Point(0, 0),
                    new Point(1, 0),
                    new Point(2, 0),
                    new Point(3, 0),
                ];
                break;
            case 1:
                result.relativePoints = [
                    new Point(1, 0),
                    new Point(0, 1),
                    new Point(1, 1),
                    new Point(2, 1),
                    new Point(1, 2),
                ];
                break;
            case 2:
                result.relativePoints = [
                    new Point(0, 0),
                    new Point(1, 0),
                    new Point(2, 0),
                    new Point(2, 1),
                    new Point(2, 2),
                ];
                break;
            case 3:
                result.relativePoints = [
                    new Point(0, 0),
                    new Point(0, 1),
                    new Point(0, 2),
                    new Point(0, 3),
                ];
                break;
            case 4:
                result.relativePoints = [
                    new Point(0, 0),
                    new Point(1, 0),
                    new Point(0, 1),
                    new Point(1, 1),
                ];
                break;
        }
        
        shapeIdx++;
        if (shapeIdx === 5) {
            shapeIdx = 0;
        }

        return result;
    }

    let floor = 0;
    let shapeNum = 0;
    const rocks = new Map<string, Point>();

    function allValid(points: Point[]) {
        return points.every((p) => p.x > 0 && p.x < 8 && p.y > 0 && !rocks.has(p.key));
    }

    
    while (shapeNum < 2022) {
        const shape = createShape();
        shape.root = new Point(3, floor + 4);

        let canDown = true;

        while(canDown) {
            const move = getMove();

            if (allValid(shape.movePoints(move))) {
                shape.root = new Point(shape.root.x + move, shape.root.y);
            }

            if (allValid(shape.downPoints)) {
                shape.root = new Point(shape.root.x, shape.root.y - 1);
            }
            else {
                const newRocks = shape.points;
                newRocks.forEach((p) => {
                    rocks.set(p.key, p);
                    if (p.y > floor) {
                        floor = p.y;
                    }
                });
                canDown = false;
            }
        }

        shapeNum++;
    }

    return {value: floor};
});