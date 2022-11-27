import { readFileSync } from 'fs';

const raw = readFileSync(__dirname + '/input.txt').toString().split('\n');

let maxSrcLength = 0;
const replacements = raw.slice(0, -2)
    .map((line) => line.split(' => '))
    .reduce((accum, value) => {
        if (!accum.has(value[0])) {
            accum.set(value[0], new Set());
            if (maxSrcLength < value[0].length) {
                maxSrcLength = value[0].length;
            }
        }
        accum.get(value[0])?.add(value[1]);
        return accum;
    }, new Map<string, Set<string>>());

const value = raw[raw.length - 1].split('');

const resultSet = new Set<string>();

for (let i = 0; i < value.length;) {
    let match = '';
    for (let len = 1; match === '' && len <= maxSrcLength && i + len <= value.length; len++) {
        const pMatch = value.slice(i, i+len).join('');
        if (replacements.has(pMatch)) {
            match = pMatch;
        }
    }

    if (match !== '') {
        for (const v of replacements.get(match)!.values()) {
            resultSet.add(
                value.slice(0, i).join('') +
                v +
                value.slice(i + match.length, value.length).join('')
            );
        }

        i += match.length;
    }
    else {
        i += 1;
    }
    
}

console.log(resultSet.size);