import { Series } from '../../utils/series';
import { input11 } from './input';

let current = input11;

const incrementChar = (s: string, by = 1): string => {
    return String.fromCharCode(s.charCodeAt(0) + by);
};

const incrementString = (s: string, index = s.length - 1): string => {
    
    if (s[index] === 'z') {
        return incrementString(s, index - 1); 
    }

    return s.slice(0, index) + incrementChar(s[index]) + [...Series.of(s.length - 1 - index, 'a')].join('');
};

const invalidChars = new Set(['i', 'o', 'l']);

const isValid = (s: string): boolean => {
    const splits = s.split('');
    let pairs = 0;
    let previousPair = undefined;
    let run = false;
    for (let i = 0; i < splits.length; i++) {
        const current = splits[i];
        if (invalidChars.has(current)) {
            return false;
        }
        if (i > 0) {
            const minus1 = splits[i-1];
            if (minus1 === current && current !== previousPair) {
                pairs++;
                previousPair = current;
            }
            else {
                previousPair = undefined;
            }
        }
        if (i > 1) {
            const minus2 = splits[i-2];
            const minus1 = splits[i-1];

            if (minus2 !== 'y' && minus2 !== 'z' && current === incrementChar(minus2, 2) && current === incrementChar(minus1)) {
                run = true;
            }
        }
    }

    return pairs > 1 && run;
};

while(!isValid(current)) {
    current = incrementString(current);
}

current = incrementString(current);

while(!isValid(current)) {
    current = incrementString(current);
}

console.log(current);