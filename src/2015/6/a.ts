import { Series } from '../../utils/series';
import { input6 } from './input';

const input = input6;

const ons = new Set<string>();

const on = (s: string) => ons.add(s);
const off = (s: string) => ons.delete(s);
const toggle = (s: string) => ons.has(s) ? off(s) : on(s);

input.forEach((box) => {

    const f = box.action === 'on' ? on : (box.action === 'off' ? off : toggle);

    for (const x of Series.range(box.start.x, box.end.x)) {
        for (const y of Series.range(box.start.y, box.end.y)) {
            f(''+x+'-'+y);
        }
    }
});

console.log(ons.size);