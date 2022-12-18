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

    const targetShapes = 1000000000000;

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

    const buffer: string[] = [];

    function allValid(points: Point[]) {
        return points.every((p) => p.x > 0 && p.x < 8 && p.y > 0 && !rocks.has(p.key));
    }
    
    const floorLog: number[][] = [];

    function runSimUntil(n: number) {
        while (shapeNum < n) {
        
            floorLog.push([shapeNum, floor, floor - (floorLog[floorLog.length - 1]?.[1] ?? 0)]);
    
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
                        buffer.push(p.key);
                    });
                    if (buffer.length > 1000) {
                        const remove = buffer.splice(0, 500);
                        remove.forEach((x) => rocks.delete(x));
                    }
                    canDown = false;
                }
            }
    
            shapeNum++;
        }
    }

    function findRepetitionPeriod(): [number, number] {
        const windowSize = 15;
        const lastIndex = floorLog.length - 1;

        function calcTarget(windowSize: number, offset = 0): number {
            let target = 0;
            for (let w = 0; w < windowSize; w++) {
                target += floorLog[lastIndex - offset - w][2];
            }
            return target;
        }

        function checkPeriod(p: number): boolean {
            return calcTarget(windowSize) === calcTarget(windowSize, p) &&
            calcTarget(p) === calcTarget(p, p);
        }

        for (let period = 15; period < input.length; period+=5) {
            if ([1,2,3,4,5].every((n) => checkPeriod(period * n))) {
                return [period, calcTarget(period)];
            }
        }

        throw Error();
    }

    runSimUntil(input.length * 10);
    const [period, height] = findRepetitionPeriod();

    console.log('period', period);

    const addLoops = Math.floor((targetShapes - shapeNum) / period);
    shapeNum += addLoops * period;
    const floorAdds = addLoops * height;
    
    console.log('ffwd', 'shapes', shapeNum, 'floor', floor + floorAdds);

    runSimUntil(targetShapes);

    floor += floorAdds;

    return {value: floor, shapeNum};
});