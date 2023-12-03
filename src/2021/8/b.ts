import { Digit, Digits, input8 } from './input';
import { intersection, setEq } from '../../ts-utils/set-math';

function overlapsWith(a: Set<unknown>, b: Set<unknown>): boolean {
    return setEq(intersection(a, b), a);
}

function main() {
    const inputSets = input8.map((i) => {
        return {
            input: i.input.map((x) => new Set(x.split(''))),
            output: i.output.map((x) => new Set(x.split(''))),
        };
    });

    let sum = 0;
    for (const v of inputSets) {
        const remaining = new Set([...v.input]);

        const one = new Digit(
            1,
            [...remaining].find((x) => x.size === Digits.get(1)?.count)!
        );
        const four = new Digit(
            4,
            [...remaining].find((x) => x.size === Digits.get(4)?.count)!
        );
        const seven = new Digit(
            7,
            [...remaining].find((x) => x.size === Digits.get(7)?.count)!
        );
        const eight = new Digit(
            8,
            [...remaining].find((x) => x.size === Digits.get(8)?.count)!
        );
        remaining.delete(one.panels);
        remaining.delete(four.panels);
        remaining.delete(seven.panels);
        remaining.delete(eight.panels);
        const three = new Digit(
            3,
            [...remaining].find(
                (x) => x.size === 5 && overlapsWith(seven.panels, x)
            )!
        );
        remaining.delete(three.panels);
        const nine = new Digit(
            9,
            [...remaining].find(
                (x) => x.size === 6 && overlapsWith(four.panels, x)
            )!
        );
        remaining.delete(nine.panels);
        const zero = new Digit(
            0,
            [...remaining].find(
                (x) => x.size === 6 && overlapsWith(one.panels, x)
            )!
        );
        remaining.delete(zero.panels);
        const six = new Digit(6, [...remaining].find((x) => x.size === 6)!);
        remaining.delete(six.panels);
        const five = new Digit(
            5,
            [...remaining].find((x) => overlapsWith(x, six.panels))!
        );
        remaining.delete(five.panels);
        const two = new Digit(2, [...remaining].find((x) => true)!);

        const digits: Digit[] = [
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
        ];

        let mult = 1000;
        let number = 0;
        for (const o of v.output) {
            const d = digits.find((x) => setEq(x.panels, o))!;
            number += d.number * mult;
            mult = mult / 10;
        }
        sum += number;
    }

    console.log(sum);
}

main();
