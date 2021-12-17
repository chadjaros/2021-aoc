import { Point } from '../../utils/point';

export const input17 = { min: new Point(128, -88), max: new Point(160, -142) };


export function model(input: {min: Point, max: Point}, initialDX: number, initialDY: number) {
    let pos = new Point(0, 0);
    let dX = initialDX;
    let dY = initialDY;

    let maxY = 0;

    // console.log(dX, dY, pos);

    while (pos.x <= input.max.x && pos.y >= input.max.y) {
        pos = new Point(pos.x + dX, pos.y + dY);
        if (pos.y > maxY) {
            maxY = pos.y;
        }
        if (dX > 0) {
            dX -= 1;
        }
        dY -= 1;
        // console.log(dX, dY, pos);

        if (pos.x >= input.min.x && pos.x <= input.max.x && pos.y <= input.min.y && pos.y >= input.max.y) {
            return {
                maxY,
                hit: true
            };
        }
    }

    return {
        hit: false
    };
}