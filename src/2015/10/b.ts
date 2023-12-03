import { Series } from '../../ts-utils/series';
import { input10 } from './input';

let current = input10;

for (const rev of Series.of(50, undefined)) {
    let next = '';
    for (let i = 0; i < current.length; i) {
        const c = current[i];
        let repeats = 1;
        while (current[i + repeats] === c) {
            repeats++;
        }
        i += repeats;

        next = next + repeats + c;
    }
    current = next;
}

console.log(current.length);
