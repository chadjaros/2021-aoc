import { input6 } from './input';

function main() {
    let current: number[] = [...input6];
    let next: number[] = [];
    for (let day = 0; day < 80; day++) {
        next = [];
        for (let i = 0; i < current.length; i++) {
            const nextval = current[i] - 1;
            if (nextval === -1) {
                next.push(6);
                next.push(8);
            }
            else {
                next.push(nextval);
            }
        }
        current = next;
    }

    console.log(current.length);
}

main();
