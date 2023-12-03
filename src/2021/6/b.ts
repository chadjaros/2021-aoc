import { input6 } from './input';

interface Cohort {
    days: number;
    count: number;
}

function main() {
    let current: Cohort[] = [];

    for (let i = 0; i < 9; i++) {
        const cohortCount = input6.filter((x) => x === i).length;
        if (cohortCount != 0) {
            current.push({ days: i, count: cohortCount });
        }
    }

    console.log(current);

    let next: Cohort[] = [];
    for (let day = 0; day < 256; day++) {
        next = [];
        for (let i = 0; i < current.length; i++) {
            const nextval = current[i].days - 1;
            if (nextval === -1) {
                const six = next.find((x) => x.days === 6);
                if (six) {
                    six.count += current[i].count;
                } else {
                    next.push({ days: 6, count: current[i].count });
                }
                next.push({ days: 8, count: current[i].count });
            } else {
                const existing = next.find((x) => x.days === nextval);
                if (existing) {
                    existing.count += current[i].count;
                } else {
                    next.push({ days: nextval, count: current[i].count });
                }
            }
        }
        current = next;
    }

    let sum = 0;
    for (let i = 0; i < current.length; i++) {
        sum += current[i].count;
    }
    console.log(sum, current);
}

main();
