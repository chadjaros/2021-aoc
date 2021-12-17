import { input1 } from './input';

function main() {
    let prev = input1[0] + input1[1] + input1[2];
    let current = 0;
    let count = 0;
    for(let i = 3; i < input1.length; i++) {
        current = input1[i] + input1[i-1] + input1[i-2];
        if (current > prev) {
            count++;
        }
        prev = current;
    }

    console.log(count);
}

main();
