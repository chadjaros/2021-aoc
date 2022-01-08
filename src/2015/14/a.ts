import { Deer, input14 } from './input';

const input = input14;

function calculateDistance(deer: Deer, seconds: number): number {
    
    let sum = 0;
    let x = 0;
    let rest = false;
    while (x < seconds) {
        if (!rest) {
            const nextX = x + deer.speedDuration;
            sum += deer.speed * (Math.min(nextX, seconds) - x);
            x = nextX;
        }
        else {
            x += deer.restDuration;
        }
        rest = !rest;
    }
    
    return sum;
}

console.log(Math.max(...input.map((d) => calculateDistance(d, 2503))));