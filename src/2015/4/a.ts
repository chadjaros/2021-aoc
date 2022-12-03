import md5 from 'md5';
import { aoc } from '../../utils/aoc';
import { input4 } from './input';

aoc(() => {
    const input = input4;

    let i = -1;
    let hash = '';
    while (!hash.startsWith('00000')) {
        i++;
        hash = md5(input+i);
    }

    return {
        value: i,
        hash,
    };
});

