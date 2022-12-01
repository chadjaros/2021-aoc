import { readFileSync } from 'fs';
import { aoc } from '../../utils/aoc';


class Elf {
    constructor(private n: number) {
    }

    deliversTo(n: number): number {
        if ((n % this.n) === 0) {
            return 10*this.n;
        }
        return 0;
    }
}

aoc(() => {
    const target = parseInt(readFileSync(__dirname + '/input.txt').toString());

    const houses: Elf[] = [];
    
    function calcHouse(currentHouse: number): number {
        if (houses.length < currentHouse) {
            for (let i = houses.length; i < currentHouse; i++) {
                houses.push(new Elf(i + 1));
            }
        }
    
        let total = 0;
    
        for (let i = 0; i < Math.floor(currentHouse / 2); i++) {
            total += houses[i].deliversTo(currentHouse);
        }
        total += houses[currentHouse-1].deliversTo(currentHouse);
    
        return total;
    }
    
    const find = (): number[] => {
        for (let i = 144; ; i+= 144) {
            const val = calcHouse(i);
            if (val > target) {
                return [i, val];
            }
        }
    };

    const [value, total] = find();
    return {
        value,
        total,
        target,
    };
});
