import { readFileSync } from 'fs';

const result = readFileSync(__dirname + '/input.txt')
    .toString()
    .split('\n')
    .reduce((a, s) => {
        let encoded = 2;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '\\' || s[i] === '"') {
                encoded++;
            }
        }

        return a + encoded;
    }, 0);

console.log(result);
