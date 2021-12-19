import { Point } from '../../utils/point';
import { input3 } from './input';

const map = new Map<string, number>();

let sPosition = new Point(0, 0);
let rPosition = new Point(0, 0);
map.set(sPosition.key, 1);
map.set(rPosition.key, 1);

const moveSet = new Map([
    ['^', (p: Point) => new Point(p.x, p.y + 1)],
    ['v', (p: Point) => new Point(p.x, p.y - 1)],
    ['<', (p: Point) => new Point(p.x - 1, p.y)],
    ['>', (p: Point) => new Point(p.x + 1, p.y)],
]);

for (let i = 0; i < input3.length; i+=2) {
    sPosition = moveSet.get(input3[i])!(sPosition);
    map.set(sPosition.key, (map.get(sPosition.key) ?? 0) + 1);

    rPosition = moveSet.get(input3[i+1])!(rPosition);
    map.set(rPosition.key, (map.get(rPosition.key) ?? 0) + 1);
}

console.log(map.size);
