import { input3 } from './input';

function calculateBinary(number: number[]): number {
    let sum = 0;
    for (let x = 0; x < number.length; x++) {
        if (number[number.length - 1 - x]) {
            sum += Math.pow(2, x);
        }
    }
    return sum;
}

function countAndFilter(list: number[][], index: number, most: boolean): number[][] {
    let zeroes = 0;
    let ones = 0;
    for (const number of list) {
        if (number[index] === 0) {
            zeroes++;
        }
        else {
            ones++;
        }
    }

    let filter = 0;
    if (zeroes === ones) {
        filter = most ? 1 : 0;
    }
    else if (zeroes > ones) {
        filter = most ? 0 : 1;
    }
    else {
        filter = most ? 1 : 0;
    }

    return list.filter((x) => x[index] === filter);
}

function main() {
    let o2genList: number[][] = input3;
    let co2scrubList: number[][] = input3;

    let index = 0;
    while (o2genList.length > 1) {

        o2genList = countAndFilter(o2genList, index, true);

        index++;
        if (index >= input3[0].length) {
            index = 0;
        }
    }

    index = 0;
    while (co2scrubList.length > 1) {

        co2scrubList = countAndFilter(co2scrubList, index, false);

        index++;
        if (index >= input3[0].length) {
            index = 0;
        }
    }

    console.log(o2genList.length, o2genList[0], calculateBinary(o2genList[0]));
    console.log(co2scrubList.length, co2scrubList[0], calculateBinary(co2scrubList[0]));
    console.log(calculateBinary(o2genList[0]) * calculateBinary(co2scrubList[0]));
}

main();
