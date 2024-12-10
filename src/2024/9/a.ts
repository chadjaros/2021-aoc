import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';


aoc((infile) => {
    const UNDEF = '.';

    const arr = infile.lines[0].split('').flatMap((v, idx) => {
        const value = parseInt(v);
        const isFile = idx % 2 === 0;
        return [...Series.of(value, isFile ? idx / 2 : UNDEF)];
    });

    let value = 0;
    let iFwd = 0;
    let iRev = arr.length - 1;
    while (iFwd < iRev) {
        if (arr[iFwd] !== UNDEF) {
            value += arr[iFwd] as number * iFwd;
            iFwd++;
        }
        else {
            while (arr[iRev] === UNDEF) {
                iRev--;
            }
            arr[iFwd] = arr[iRev];
            arr[iRev] = UNDEF;
            iRev--;
        }
    }
    while (arr[iFwd] !== UNDEF) {
        value += arr[iFwd] as number * iFwd;
        iFwd++;
    }

    return { value };
});
