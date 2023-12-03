import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

interface Direction {
    vector: Point;
    left: Direction;
    right: Direction;
    value: number;
}

aoc((infile) => {
    const input = infile// .sample()
        .buffer
        .toString()
        .split('\n');

    const gridLines = input.slice(0, -3).map((l) => l.split(''));

    const grid = Grid.fromSize(
        gridLines.reduce((acc, l) => (acc > l.length ? acc : l.length), 0),
        gridLines.length,
        ' '
    );

    gridLines.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char !== ' ') {
                grid.setValue(new Point(x, y), char);
            }
        });
    });

    const commands = Array.from(
        input[input.length - 2].matchAll(/(\d+)([RL]?)+/g)
    )
        .flatMap((x) => [x[1], x[2]])
        .filter((x) => x !== undefined);

    const right: Direction = {
        vector: new Point(1, 0),
        value: 0,
    } as Direction;

    const down: Direction = {
        vector: new Point(0, 1),
        left: right,
        value: 1,
    } as Direction;
    const left: Direction = {
        vector: new Point(-1, 0),
        left: down,
        value: 2,
    } as Direction;

    const up: Direction = {
        vector: new Point(0, -1),
        left: left,
        right: right,
        value: 3,
    };
    right.left = up;
    right.right = down;
    left.right = up;
    down.right = left;

    let position = new Point(
        grid.scanIncXFrom(new Point(0, 0), (v) => v !== ' ')!.x,
        0
    );
    let direction = right;

    console.log(position.key);

    function move(start: Point, direction: Direction, count: number): Point {
        let current = start;
        for (let mv = 0; mv < count; mv++) {
            let next = new Point(
                (grid.width + current.x + direction.vector.x) % grid.width,
                (grid.height + current.y + direction.vector.y) % grid.height
            );
            let nextValue = grid.getValue(next);
            while (nextValue === ' ') {
                next = new Point(
                    (grid.width + next.x + direction.vector.x) % grid.width,
                    (grid.height + next.y + direction.vector.y) % grid.height
                );
                nextValue = grid.getValue(next);
            }

            if (nextValue === '#') {
                return current;
            }

            current = next;
        }

        return current;
    }

    for (const m of commands) {
        if (m === 'L') {
            direction = direction.left;
        } else if (m === 'R') {
            direction = direction.right;
        } else {
            const moveCt = parseInt(m);

            position = move(position, direction, moveCt);
        }
    }

    return {
        value: 1000 * (position.y + 1) + 4 * (position.x + 1) + direction.value,
    };
});
