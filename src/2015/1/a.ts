import { input1 } from './input';

const result = input1.split('').reduce((sum, val) => {
    return (val === ')' ? -1 : 1) + sum;
}, 0);

console.log(result);