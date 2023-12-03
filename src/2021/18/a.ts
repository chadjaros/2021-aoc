import { Possible } from '../../ts-utils/util-types';
import { input18, SNNumber } from './input';

const input = input18;

let sum: Possible<SNNumber> = undefined;
for (const n of input) {
    if (!sum) {
        sum = n;
    } else {
        sum = sum.plus(n);
    }
}

console.log(sum?.magnitude, sum?.toString());
