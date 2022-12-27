import { aoc } from '../../utils/aoc';

function toDec(n: string): number {
    return n.split('').reduceRight((acc, v, idx) => {
        const base = Math.pow(5, n.length - idx - 1);
        if (v === '=') {
            return acc + base * -2;
        }
        else if (v === '-') {
            return acc + base * -1;
        }

        return acc + base * parseInt(v);

    }, 0);
}

function fromDec(n: number): string {

    let pow = 0;

    do {
        pow++;
    } while(n > Math.pow(5, pow+1));

    let rem = n;
    const result: number[] = [];
    do {
        const div = Math.pow(5, pow);

        const dig = Math.floor(rem / div);
        
        if (dig >= 3) {
            result.push(dig);
            let i = result.length - 1;
            while (i >= 0 && result[i] >= 3) {
                if (i === 0) {
                    result.unshift(0);
                    i++;
                }
                result[i - 1]++;
                result[i] = result[i] - 5; 
                i--;
            }
        }
        else {
            result.push(dig);
        }
        rem -= dig * div;    
        pow--;
    }
    while (rem !== 0 && pow >= 0);

    return result.map(x => x === -2 ? '=' : (x === -1 ? '-' : '' + x)).join('');
}

aoc(infile => {

    const input = infile
        // .sample()
        .lines;

    let add = 0;

    for (const l of input) {
        const dec = toDec(l);
        add += dec;
    }
    const value = fromDec(add); 

    return {value, add};
});