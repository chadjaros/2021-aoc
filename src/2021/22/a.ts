import { Vector2 } from '../../utils/point-2d';
import { Point3, Vector3 } from '../../utils/point-3d';
import { input22 } from './input';

const input = input22;

const map = new Set<string>();
const bounds = {
    min: Vector3.fromCoordinates(-50, -50, -50),
    max: Vector3.fromCoordinates(50, 50, 50),
};
for (const i of input) {
    console.log(i.line);
    i.execute(map, bounds);
}

console.log(map.size);