import { dir } from 'console';
import { aoc } from '../../ts-utils/aoc';
import { Grid } from '../../ts-utils/grid';
import { Point } from '../../ts-utils/point-2d';

interface Direction {
    name: string;
    vector: Point;
    left: Direction;
    right: Direction;
    value: number;
}

type Transition = (point: Point, dir: Direction) => [Point, Direction];

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

    const faceSize = gridLines[0].length / 3;

    const commands = Array.from(
        input[input.length - 2].matchAll(/(\d+)([RL]?)+/g)
    )
        .flatMap((x) => [x[1], x[2]])
        .filter((x) => x !== undefined);

    const right: Direction = {
        name: 'right',
        vector: new Point(1, 0),
        value: 0,
    } as Direction;

    const down: Direction = {
        name: 'down',
        vector: new Point(0, 1),
        left: right,
        value: 1,
    } as Direction;
    const left: Direction = {
        name: 'left',
        vector: new Point(-1, 0),
        left: down,
        value: 2,
    } as Direction;

    const up: Direction = {
        name: 'up',
        vector: new Point(0, -1),
        left: left,
        right: right,
        value: 3,
    };
    right.left = up;
    right.right = down;
    left.right = up;
    down.right = left;

    let transition: Transition = () => [new Point(0, 0), right];
    const reverse = (n: number) => faceSize - 1 - n;
    if (faceSize === 4) {
        // Sample input
        transition = (p: Point, dir: Direction) => {
            const gridX = Math.floor(p.x / faceSize);
            const gridY = Math.floor(p.y / faceSize);

            let result: [Point, Direction] = [new Point(0, 0), right];

            // Top top
            if (gridY < 0) {
                result = [
                    new Point(reverse(p.x - 2 * faceSize), faceSize),
                    down,
                ];
            } else if (gridX === 0 && gridY === 0) {
                result = [new Point(reverse(p.x) + 2 * faceSize, 0), down];
            }
            // Top left
            else if (gridX === 1 && gridY === 0) {
                if (dir === left) {
                    result = [new Point(faceSize + p.y, faceSize), down];
                } else if (dir === up) {
                    // dir === up
                    result = [new Point(faceSize * 2, p.x - faceSize), right];
                } else {
                    console.log('fail', p.key, dir.name);
                    throw Error();
                }
            }
            // Top right
            else if (gridX === 3 && gridY === 0) {
                result = [
                    new Point(faceSize * 4 - 1, reverse(p.y) + 2 * faceSize),
                    left,
                ];
            } else if (gridX === 4) {
                result = [
                    new Point(faceSize * 3 - 1, reverse(p.y - 2 * faceSize)),
                    left,
                ];
            }
            // far left
            else if (gridX < 0) {
                result = [
                    new Point(
                        3 * faceSize + reverse(p.y - faceSize),
                        faceSize * 3 - 1
                    ),
                    up,
                ];
            } else if (gridY === 3 && gridX === 3) {
                result = [
                    new Point(0, faceSize + reverse(p.x - 3 * faceSize)),
                    right,
                ];
            }
            // Bottom left
            else if (gridY === 2 && gridX === 1) {
                if (dir === down) {
                    result = [
                        new Point(
                            2 * faceSize,
                            reverse(p.x - faceSize) + 2 * faceSize
                        ),
                        right,
                    ];
                } else if (dir === left) {
                    result = [
                        new Point(
                            reverse(p.y - 2 * faceSize) + faceSize,
                            2 * faceSize - 1
                        ),
                        up,
                    ];
                } else {
                    console.log('fail', p.key, dir.name);
                    throw Error();
                }
            }
            // Middle right
            else if (gridX === 3 && gridY === 1) {
                if (dir === right) {
                    result = [
                        new Point(
                            reverse(p.y - faceSize) + 3 * faceSize,
                            2 * faceSize
                        ),
                        down,
                    ];
                } else if (dir === up) {
                    result = [
                        new Point(
                            3 * faceSize - 1,
                            reverse(p.x - 3 * faceSize) + faceSize
                        ),
                        left,
                    ];
                } else {
                    console.log('fail', p.key, dir.name);
                    throw Error();
                }
            }
            // bottom
            else if (gridY === 3 && gridX === 2) {
                result = [
                    new Point(reverse(p.x - 2 * faceSize), 2 * faceSize - 1),
                    up,
                ];
            } else if (gridX === 0 && gridY === 2) {
                result = [
                    new Point(reverse(p.x) + 2 * faceSize, 3 * faceSize - 1),
                    up,
                ];
            } else {
                console.log('fail', p.key, dir.name);
                throw Error();
            }

            console.log(
                'transition from',
                p.key,
                dir.name,
                'to',
                result[0].key,
                result[1].name
            );

            return result;
        };
    } else {
        //    12
        //  3 AB 4
        //  5 C 6
        // 7 DE 8
        // 9 F a
        //   b
        transition = (p: Point, dir: Direction) => {
            const gridX = Math.floor(p.x / faceSize);
            const gridY = Math.floor(p.y / faceSize);

            let result: [Point, Direction] = [new Point(0, 0), right];

            // 1-9, 9-1
            if (gridY < 0 && gridX === 1) {
                result = [new Point(0, p.x + 2 * faceSize), right];
            } else if (gridX < 0 && gridY === 3) {
                result = [new Point(p.y - 2 * faceSize, 0), down];
            }
            // 2-b, b-2
            else if (gridY < 0 && gridX === 2) {
                result = [new Point(p.x - 2 * faceSize, faceSize * 4 - 1), up];
            } else if (gridY === 4) {
                result = [new Point(p.x + 2 * faceSize, 0), down];
            }
            // 3-7, 7-3
            else if (gridX === 0 && gridY === 0) {
                result = [new Point(0, reverse(p.y) + 2 * faceSize), right];
            } else if (gridX < 0 && gridY === 2) {
                result = [
                    new Point(faceSize, reverse(p.y - 2 * faceSize)),
                    right,
                ];
            }
            // 4-8, 8-4
            else if (gridX === 3) {
                result = [
                    new Point(2 * faceSize - 1, reverse(p.y) + 2 * faceSize),
                    left,
                ];
            } else if (gridX === 2 && gridY === 2) {
                result = [
                    new Point(3 * faceSize - 1, reverse(p.y - 2 * faceSize)),
                    left,
                ];
            }
            // 5
            else if (gridX === 0 && gridY === 1 && dir === left) {
                result = [new Point(p.y - faceSize, 2 * faceSize), down];
            } else if (gridX === 0 && gridY === 1 && dir === up) {
                result = [new Point(faceSize, p.x + faceSize), right];
            }
            // 6
            else if (gridX === 2 && gridY === 1 && dir === down) {
                result = [new Point(2 * faceSize - 1, p.x - faceSize), left];
            } else if (gridX === 2 && gridY === 1 && dir === right) {
                result = [new Point(p.y + faceSize, faceSize - 1), up];
            }
            // a
            else if (gridX === 1 && gridY === 3 && dir === down) {
                result = [new Point(faceSize - 1, p.x + 2 * faceSize), left];
            } else if (gridX === 1 && gridY === 3 && dir === right) {
                result = [new Point(p.y - 2 * faceSize, 3 * faceSize - 1), up];
            }

            // console.log('transition from', p.key, dir.name, 'to', result[0].key, result[1].name);

            return result;
        };
    }

    function move(
        start: Point,
        direction: Direction,
        count: number
    ): [Point, Direction] {
        let current = start;
        let dir = direction;
        for (let mv = 0; mv < count; mv++) {
            let next = new Point(
                current.x + dir.vector.x,
                current.y + dir.vector.y
            );
            let nextValue = grid.isValid(next) ? grid.getValue(next) : ' ';
            let nextDir = dir;

            if (nextValue === ' ') {
                [next, nextDir] = transition(next, dir);
                nextValue = grid.getValue(next);
            }

            if (nextValue === '#') {
                return [current, dir];
            }

            current = next;
            dir = nextDir;
        }

        return [current, dir];
    }

    let position = new Point(
        grid.scanIncXFrom(new Point(0, 0), (v) => v !== ' ')!.x,
        0
    );
    let direction = right;

    console.log(position.key);

    for (const m of commands) {
        if (m === 'L') {
            // console.log('turning L', direction.name, '>', direction.left.name, position.key);
            direction = direction.left;
        } else if (m === 'R') {
            // console.log('turning R', direction.name, '>', direction.right.name, position.key);
            direction = direction.right;
        } else {
            const moveCt = parseInt(m);

            [position, direction] = move(position, direction, moveCt);
        }
    }

    return {
        value: 1000 * (position.y + 1) + 4 * (position.x + 1) + direction.value,
    };
});
