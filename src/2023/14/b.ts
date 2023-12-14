import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';
import { Series } from '../../ts-utils/series';
import { Possible } from '../../ts-utils/util-types';


function tiltN(grid: Grid<string>): void {
    grid.forEach((value, point) => {
        if (value === 'O') {
            const upOne = point.minus(new Point(0, 1));
            if (grid.isValid(upOne) && grid.getValue(upOne) === '.') {
                const used = grid.scanDecYFrom(point, (value) => value !== '.')!;
                grid.setValue(point, '.');
                if (used) {
                    grid.setValue(used.plus(new Point(0, 1)), 'O');
                }
                else {
                    grid.setValue(new Point(point.x, 0), 'O');
                }
            }
        }
    });
}

function tiltS(grid: Grid<string>): void {
    grid.forEachRev((value, point) => {
        if (value === 'O') {
            const downOne = point.plus(new Point(0, 1));
            if (grid.isValid(downOne) && grid.getValue(downOne) === '.') {
                const used = grid.scanIncYFrom(point, (value) => value !== '.')!;
                grid.setValue(point, '.');
                if (used) {
                    grid.setValue(used.minus(new Point(0, 1)), 'O');
                }
                else {
                    grid.setValue(new Point(point.x, grid.height - 1), 'O');
                }
            }
        }
    });
}

function tiltW(grid: Grid<string>): void {
    grid.forEach((value, point) => {
        if (value === 'O') {
            const leftOne = point.minus(new Point(1, 0));
            if (grid.isValid(leftOne) && grid.getValue(leftOne) === '.') {
                const used = grid.scanDecXFrom(point, (value) => value !== '.')!;
                grid.setValue(point, '.');
                if (used) {
                    grid.setValue(used.plus(new Point(1, 0)), 'O');
                }
                else {
                    grid.setValue(new Point(0, point.y), 'O');
                }
            }
        }
    });
}

function tiltE(grid: Grid<string>): void {
    grid.forEachRev((value, point) => {
        if (value === 'O') {
            const rightOne = point.plus(new Point(1, 0));
            if (grid.isValid(rightOne) && grid.getValue(rightOne) === '.') {
                const used = grid.scanIncXFrom(point, (value) => value !== '.')!;
                grid.setValue(point, '.');
                if (used) {
                    grid.setValue(used.minus(new Point(1, 0)), 'O');
                }
                else {
                    grid.setValue(new Point(grid.width - 1, point.y), 'O');
                }
            }
        }
    });
}

aoc((infile) => {
    const grid = infile.grid('', (_) => _);

    const memo = new Map<string, number>();
    const cycle = (grid: Grid<string>, ct: number): Possible<[number, number]> => {
        tiltN(grid);
        tiltW(grid);
        tiltS(grid);
        tiltE(grid);
        const mem = grid.toString();
        if (memo.has(mem)) {
            return [memo.get(mem)!, ct];
        }
        memo.set(mem, ct);
        return;
    };

    let detected: Possible<[number, number]> = undefined;
    let iterations = 0;
    while (detected === undefined) {
        iterations++;
        detected = cycle(grid, iterations);
    }

    const cycleLen = detected[1] - detected[0];
    const remaining = (1000000000 - detected[1]) % cycleLen;

    for (const i of Series.until(detected[1], detected[1] + remaining)) {
        cycle(grid, iterations);
    }

    let value = 0;
    grid.forEach((char, point) => {
        if (char === 'O') {
            value += grid.height - point.y;
        }
    });
    return {
        value,
        detected,
        remaining
    };

});
