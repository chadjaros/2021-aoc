import { Point } from '../../ts-utils/point-2d';
import { input25 } from './input';

const rights = new Map([...input25.data].filter((x) => x[1].value === '>'));
const downs = new Map([...input25.data].filter((x) => x[1].value === 'v'));

const width = input25.width;
const height = input25.height;

console.log(width, height);

function next(v: { point: Point; value: string }): Point {
    if (v.value === 'v') {
        const newY = v.point.y + 1;
        return new Point(v.point.x, newY >= height ? 0 : newY);
    } else {
        const newX = v.point.x + 1;
        return new Point(newX >= width ? 0 : newX, v.point.y);
    }
}

function print() {
    for (let y = 0; y < height; y++) {
        const row: string[] = [];
        for (let x = 0; x < width; x++) {
            const p = new Point(x, y);
            if (downs.has(p.key)) {
                row.push('v');
            } else if (rights.has(p.key)) {
                row.push('>');
            } else {
                row.push('.');
            }
        }
        console.log(row.join(''));
    }
    console.log();
}

let moved = true;
let round = 0;
while (moved) {
    round++;

    const replaceRight: {
        old: string;
        new: { point: Point; value: string };
    }[] = [];

    rights.forEach((x) => {
        const n = next(x);
        const nKey = n.key;
        if (!rights.has(nKey) && !downs.has(nKey)) {
            replaceRight.push({
                old: x.point.key,
                new: { point: n, value: x.value },
            });
        }
    });

    replaceRight.forEach((x) => {
        rights.delete(x.old);
        rights.set(x.new.point.key, x.new);
    });
    moved = replaceRight.length > 0;

    const replaceDown: { old: string; new: { point: Point; value: string } }[] =
        [];

    downs.forEach((x) => {
        const n = next(x);
        const nKey = n.key;
        if (!rights.has(nKey) && !downs.has(nKey)) {
            replaceDown.push({
                old: x.point.key,
                new: { point: n, value: x.value },
            });
        }
    });

    replaceDown.forEach((x) => {
        downs.delete(x.old);
        downs.set(x.new.point.key, x.new);
    });
    moved = moved || replaceDown.length > 0;
}

console.log(round);
