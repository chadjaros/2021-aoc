import { StringDecoder } from 'string_decoder';
import { Deer, input14 } from './input';

const input = input14;


const map = new Map<string, {rest: boolean, next: number, distance: number, points: number}>(
    input.map((x) => ([x.name, {rest: false, next: x.speedDuration, distance: 0, points: 0}]))
);


for (let x = 1; x <= 2503; x++) {
    let leadDistance = 0;
    let leaders = new Set<string>();
    input.forEach((deer) => {
        const status = map.get(deer.name)!;
        if (!status.rest) {
            status.distance += deer.speed;
        }
        if (status.distance > leadDistance) {
            leaders = new Set([deer.name]);
            leadDistance = status.distance;
        }
        else if (status.distance === leadDistance) {
            leaders.add(deer.name);
        }
        if (x === status.next) {
            status.rest = !status.rest;
            status.next += status.rest ? deer.restDuration : deer.speedDuration;
        }
    });
    
    [...leaders.values()].map((leader) => map.get(leader)!.points++);
}

console.log(Math.max(...[...map.values()].map((d) => d.points)));
