import { aoc } from '../../ts-utils/aoc';
import { Series } from '../../ts-utils/series';


aoc((infile) => {
    const UNDEF = undefined;

    const arr = infile.lines[0].split('').map((v, idx) => {
        const value = parseInt(v);
        const isFile = idx % 2 === 0;
        return {
            length: value,
            value: isFile ? idx / 2 : UNDEF
        };
    });

    let firstUndef = arr.findIndex((x) => x.value === UNDEF);
    let iRev = arr.length - 1;
    while (iRev > 0) {
        if (arr[iRev].value !== UNDEF) {
            let needMatch = true;
            for (let i = firstUndef; needMatch && i < iRev; i++) {
                const file = arr[iRev];
                const space = arr[i];
                if (space.value === UNDEF && space.length >= file.length) {
                    needMatch = false;
                    const replacements = [{ ...file }];
                    if (space.length > file.length) {
                        replacements.push({ length: space.length - file.length, value: UNDEF });
                    }
                    file.value = UNDEF;
                    arr.splice(i, 1, ...replacements);
                    if (firstUndef === i) {
                        while (arr[firstUndef].value !== UNDEF) {
                            firstUndef++;
                        }
                    }
                }
            }
        }

        iRev--;
    }

    let value = 0;
    let idx = 0;
    for (const entry of arr) {
        if (entry.value !== UNDEF) {
            for (let i = idx; i < idx + entry.length; i++) {
                value += i * entry.value!;
            }
        }
        idx += entry.length;
    }

    return { value };
});
