import { input9 } from './input';

function main() {
    let sum = 0;
    for (let y = 0; y < input9.length; y++) {
        for (let x = 0; x < input9[0].length; x++) {
            const point = input9[y][x];

            const belowAbove = y > 0 ? point < input9[y - 1][x] : true;
            const belowBelow =
                y < input9.length - 1 ? point < input9[y + 1][x] : true;
            const belowLeft = x > 0 ? point < input9[y][x - 1] : true;
            const belowRight =
                x < input9[0].length - 1 ? point < input9[y][x + 1] : true;

            if (belowAbove && belowBelow && belowLeft && belowRight) {
                console.log('low point', x, y, point);
                sum += point + 1;
            }
        }
    }

    console.log(sum);
}

main();
