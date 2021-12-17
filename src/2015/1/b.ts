import { input1 } from './input';

const input = input1.split('');
let sum = 0;
for (let x = 0; x < input.length; x++) {
    sum += input[x] === ')' ? -1 : 1;
    if (sum === -1) {
        console.log(x + 1);
        break;
    }
}