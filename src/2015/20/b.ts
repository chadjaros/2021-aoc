import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';

const calcElf = (house: number, elfNumber: number): number => {
    if (house > 50*elfNumber) {
        return 0;
    }
    if (house % elfNumber !== 0) {
        return 0;
    }
    return elfNumber * 11;
};

const calcSeries = (house: number): number => {
    let total = 0;
    for (let div = 1; div <= 50 && div <= house; div++) {
        if (house % div === 0) {
            total += calcElf(house, house / div);
        }
    }
    return total;
};

aoc(() => {

    const target = parseInt(readFileSync(__dirname + '/input.txt').toString());

    let house = 0;
    let total = 0;
    
    while (total <= target) {
        house += 144;
        total = calcSeries(house);
    }

    return {value: house, total, target};
});