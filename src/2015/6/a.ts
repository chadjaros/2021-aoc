import { BoundingBox3 } from '../../ts-utils/point-3d';
import { Series } from '../../ts-utils/series';
import { Timer } from '../../ts-utils/timer';
import { input6 } from './input';

const t = new Timer().start();

const input = input6;

const ons = new Set<string>();

const on = (s: string) => ons.add(s);
const off = (s: string) => ons.delete(s);
const toggle = (s: string) => (ons.has(s) ? off(s) : on(s));

input.forEach((box) => {
    const f = box.action === 'on' ? on : box.action === 'off' ? off : toggle;

    for (const x of Series.range(box.start.x, box.end.x)) {
        for (const y of Series.range(box.start.y, box.end.y)) {
            f('' + x + '-' + y);
        }
    }
});

console.log('brute', ons.size, 't', t.stop().time);

t.reset().start();

const areas = new Map<string, BoundingBox3>();

input.forEach((b) => {
    const box = BoundingBox3.fromCoordinates(
        b.start.x - 0.5,
        b.start.y - 0.5,
        -0.5,
        b.end.x + 0.5,
        b.end.y + 0.5,
        0.5
    );

    const on = new Map<string, BoundingBox3>([[box.descriptionString(), box]]);

    [...areas.values()].forEach((other) => {
        if (box.intersects(other)) {
            const isect = box.intersectionAndRemainder(other);
            areas.delete(other.descriptionString());
            isect?.segments.forEach((s) => areas.set(s.descriptionString(), s));

            if (b.action === 'toggle') {
                [...on.values()].forEach((o) => {
                    if (isect?.intersection.intersects(o)) {
                        const sub =
                            isect.intersection.intersectionAndRemainder(o);
                        on.delete(o.descriptionString());
                        sub?.segments.forEach((ss) =>
                            on.set(ss.descriptionString(), ss)
                        );
                    }
                });
            }
        }
    });

    if (b.action !== 'off') {
        on.forEach((t) => areas.set(t.descriptionString(), t));
    }
});

console.log(
    'bbox',
    [...areas.values()].reduce((a, x) => a + x.volume, 0),
    't',
    t.stop().time
);
