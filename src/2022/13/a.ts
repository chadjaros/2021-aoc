import { aoc } from '../../utils/aoc';

aoc((infile) => {

    const input = infile.lines.map((x) => {
        if (x === '') {
            return null;
        }
        return JSON.parse(x);
    })
        .filter((x) => x !== null);


    let value = 0;


    const compareLists = (left: any[], right: any[]): boolean|undefined => {
        // console.log(left, ' - ', right, left.length, right.length);
        let i = 0;
        while(i < left.length && i < right.length) {
            if (typeof left[i] === 'number' && typeof right[i] === 'number') {
                if (left[i] > right[i]) {
                    return false;
                }
                else if (left[i] < right[i]) {
                    return true;
                }
            } 
            else if (typeof left[i] === 'object' && typeof right[i] === 'object') {
                const r = compareLists(left[i], right[i]);
                if (r !== undefined) {
                    return r;
                }
            }
            else if (typeof left[i] === 'number') {
                const r = compareLists([left[i]], right[i]);
                if (r !== undefined) {
                    return r;
                }
            }
            else if (typeof right[i] === 'number') {
                const r = compareLists(left[i], [right[i]]);
                if (r !== undefined) {
                    return r;
                }
            }
            i++;
        }

        if (left.length < right.length) {
            return true;
        }
        else if (left.length > right.length) {
            return false;
        }

    };

    let pairIdx = 1;
    for (let lineIdx = 0; lineIdx < input.length; lineIdx += 2) {
        const left = input[lineIdx] as any[];
        const right = input[lineIdx+1] as any[];
        
        if (compareLists(left, right)) {
            value += pairIdx;
        }
        pairIdx++;
    }

    return { value };
});