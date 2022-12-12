import { aoc } from '../../utils/aoc';

aoc((infile) => {
    
    const input = infile.regexLines(/(\d+)[^\d]+(\d+)/)
        .map((x) => ({row: parseInt(x[0]), col: parseInt(x[1])}))[0];

    console.log(input);

    const next = (v: number): number => {
        return (v * 252533) % 33554393;
    };

    let maxRow = 1;
    let row = 1;
    let col = 1;
    let current = 20151125;
    
    while(!(col === input.col && row === input.row)) {
        col++;
        row--;
        if (col > maxRow) {
            maxRow++;
            row = maxRow;
            col = 1;
        }
        current = next(current);
    }

    return {
        value: current, row, col
    };
});