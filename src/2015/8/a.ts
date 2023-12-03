import { readFileSync } from 'fs';

const result = readFileSync(__dirname + '/input.txt')
    .toString()
    .split('\n')
    .reduce((a, s) => {
        let savings = 2;
        for (let i = 1; i < s.length - 1; i++) {
            if (s[i] === '\\') {
                if (s[i + 1] === '\\' || s[i + 1] === '"') {
                    i++;
                    savings++;
                } else if (s[i + 1] === 'x') {
                    i += 3;
                    savings += 3;
                }
            }
        }

        return a + savings;
    }, 0);

console.log(result);
