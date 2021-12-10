import { Direction, input2 } from './input';

function main() {
    let x = 0;
    let depth = 0;
    let aim = 0;

    for (const v of input2) {
        if (v.dir === Direction.Down) {
            aim += v.distance;
        }
        else if (v.dir === Direction.Up) {
            aim -= v.distance;
        }
        else if (v.dir === Direction.Forward) {
            x += v.distance;
            depth += aim * v.distance;
        }
    }

    console.log(x, depth, x*depth);
}

main();
