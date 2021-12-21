import { Vector3 } from '../../utils/point-3d';
import { seriesSum } from '../../utils/series-math';
import { BeaconDiff, input19, rotationMatrices, Scanner } from './input';

const input = input19;

const start = Date.now();

input.forEach((scanner) => {
    for (let i = 0; i < scanner.beacons.length; i++) {
        for (let j = i + 1; j < scanner.beacons.length; j++) {
            scanner.differences.push({
                a: scanner.beacons[i],
                b: scanner.beacons[j],
                difference: scanner.beacons[i].minus(scanner.beacons[j])
            });
        }
    }
});

const matchesFor12Points = seriesSum((v)=>v, 1, 12);
console.log('expected matches for 12 of same points', matchesFor12Points);

interface ScannerMatch {
    a: Scanner, 
    b: Scanner,
    aMatches: BeaconDiff[],
    bMatches: BeaconDiff[],
}

const pairs: ScannerMatch[] = [];
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        const s1 = input[i];
        const s2 = input[j];
        let hits = 0;
        const aMatches: BeaconDiff[] = [];
        const bMatches: BeaconDiff[] = [];

        s1.differences.forEach((d1) => {
            s2.differences.forEach((d2) => {
                if (d1.difference.magnitude === d2.difference.magnitude) {
                    hits++;
                    aMatches.push(d1);
                    bMatches.push(d2);
                }
            });
        });
        if (hits >= matchesFor12Points) {
            console.log(s1.id, s2.id, hits);
            pairs.push({a: s1, b: s2, aMatches, bMatches});
        }
    }
}

function findResolutionOrder(s: Scanner, pairs: ScannerMatch[], seen: Set<Scanner>): Scanner[] {
    if (seen.has(s)) {
        return [];
    }

    seen.add(s);

    return [s, ...[
        ...pairs.filter((x) => x.a === s).map((x) => x.b),
        ...pairs.filter((x) => x.b === s).map((x) => x.a)
    ].flatMap((x) => findResolutionOrder(x, pairs, seen))];
}

const order = findResolutionOrder(input[0], pairs, new Set());

// console.log(order.map((x) => x.id));

const complete = new Map<string, Scanner>([[input[0].id, input[0]]]);

for (let i = 1; i < order.length; i++) {
    const target = order[i];
    const pair = pairs.find((x) => (x.a.id === target.id && complete.has(x.b.id)) || (x.b.id === target.id && complete.has(x.a.id)));

    if (!pair) {
        throw Error('no pair found');
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const source = complete.get((pair.a === target ? pair.b : pair.a).id)!;

    console.log('resolving', target.id, 'against', source.id);

    const sourceMatches = (pair.a === target ? pair.bMatches : pair.aMatches).map((x) => {
        return {
            a: Vector3.fromMatrix(source.rotation.dot(x.a)), 
            b: Vector3.fromMatrix(source.rotation.dot(x.b)), 
            difference: Vector3.fromMatrix(source.rotation.dot(x.difference)),
        };
    });
    const targetDifferences = pair.a === target ? pair.aMatches : pair.bMatches;

    const newScanner = new Scanner(target.id, []);
    const rotation = rotationMatrices.find((rm) => {

        const rotated = targetDifferences
            .map((d) => ({
                a: Vector3.fromMatrix(rm.dot(d.a)), 
                b: Vector3.fromMatrix(rm.dot(d.b)), 
                difference: Vector3.fromMatrix(rm.dot(d.difference)), 
                rev: Vector3.fromMatrix(rm.dot(d.difference)).times(-1)
            }));
        let hits = 0;
        const translations = new Map<string, {t: Vector3, hits: number}>();
        sourceMatches.forEach((d) => {
            rotated.forEach((r) => {
                if (d.difference.equals(r.difference)) {
                    hits++;
                    const t = d.a.minus(r.a);
                    translations.set(t.toString(), {t, hits: 1 + (translations.get(t.toString())?.hits ?? 0)});
                    // console.log(r.a.toString(), '>', r.b.toString(), ' | ', d.a.toString(), '>', d.b.toString(), d.difference.toString(), t.toString(), r.a.plus(t).toString());
                }
                else if (d.difference.equals(r.rev)) {
                    hits++;
                    const t = d.a.minus(r.b);
                    translations.set(t.toString(), {t, hits: 1 + (translations.get(t.toString())?.hits ?? 0)});
                }
            }); 
        });
        // console.log('finding matrix', rm.toString(), hits);
        if (hits >= matchesFor12Points) {
            newScanner.differences = rotated;
            newScanner.translation = [...translations.values()].reduce((max, t) => {
                if (t.hits > max.hits) {
                    return t;
                } 
                return max;
            }).t.plus(source.translation);
            return true;
        }
        return false;
    });

    console.log(target.id, rotation?.toString(), newScanner.translation?.toString());
    if (!rotation) {
        throw Error('no rotation found');
    }
    if (!newScanner.translation) {
        throw Error('no translation found');
    }
    
    newScanner.rotation = rotation;
    newScanner.beacons = target.beacons.map((b) => Vector3.fromMatrix(rotation.dot(b).plus(newScanner.translation)));
    // newScanner.beacons.forEach((b) => {
    //     source.beacons.forEach((sb) => {
    //         if (b.equals(sb)) {
    //             console.log('match', b.toString());
    //         }
    //     });
    // });
    complete.set(newScanner.id, newScanner);
}

const allBeacons = new Set<string>();
complete.forEach((s) => {
    s.beacons.forEach((b) => {        
        allBeacons.add(b.toString());
    });
});

console.log(allBeacons.size, 'timing', Date.now() - start);

export const allScanners20 = complete;