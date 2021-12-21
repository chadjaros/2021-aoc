import * as md5 from 'md5';
import { input4 } from './input';

const input = input4;

let i = -1;
let hash = '';
while (!hash.startsWith('00000')) {
    i++;
    hash = md5(input+i);
}

console.log(i, hash);
