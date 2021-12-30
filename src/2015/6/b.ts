import { Series } from '../../utils/series';
import { Timer } from '../../utils/timer';
import { input6 } from './input';

const t = new Timer().start();

const input = input6;

const ons = new Map<string, number>();

const on = (s: string) => ons.set(s, (ons.get(s) ?? 0) + 1);
const off = (s: string) => ons.set(s, Math.max(0, (ons.get(s) ?? 0) - 1));
const toggle = (s: string) => ons.set(s, (ons.get(s) ?? 0) + 2);

input.forEach((box) => {

    const f = box.action === 'on' ? on : (box.action === 'off' ? off : toggle);

    for (const x of Series.range(box.start.x, box.end.x)) {
        for (const y of Series.range(box.start.y, box.end.y)) {
            f(''+x+'-'+y);
        }
    }
});

console.log('brute', [...ons.values()].reduce((a, v) => a + v, 0), 't', t.stop().time);