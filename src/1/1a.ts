import { input1 } from './1-input';


function main() {
    let count = 0;
    for (let i = 1; i < input1.length; i++) {
        if (input1[i] > input1[i-1]) {
            count++;
        }
    }

    console.log('count:', count);
}

main();
