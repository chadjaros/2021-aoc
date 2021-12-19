import { Point } from '../../utils/point';
import { input3 } from './input';

const map = new Map<string, number>();

let position = new Point(0, 0);

map.set(position.key, 1);

const moveSet = new Map([
    ['^', (p: Point) => new Point(p.x, p.y + 1)],
    ['v', (p: Point) => new Point(p.x, p.y - 1)],
    ['<', (p: Point) => new Point(p.x - 1, p.y)],
    ['>', (p: Point) => new Point(p.x + 1, p.y)],
]);

for (const d of input3) {
    position = moveSet.get(d)!(position);
    map.set(position.key, (map.get(position.key) ?? 0) + 1);
}

console.log(map.size);
