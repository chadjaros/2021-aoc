import { Series } from '../../ts-utils/series';
import { input21 } from './input';

const input = input21;

function calculateRollDistribution(): number[][] {
    const map = new Map<number, number>();
    for (const x of Series.range(1, 3)) {
        for (const y of Series.range(1, 3)) {
            for (const z of Series.range(1, 3)) {
                const sum = x + y + z;
                map.set(sum, (map.get(sum) ?? 0) + 1);
            }
        }
    }
    return [...map.entries()];
}
const rollDistribution = calculateRollDistribution();

class Player {
    constructor(
        public id: string,
        public position = 1,
        public points = 0
    ) { }
    isWinner() {
        return this.points >= 21;
    }
    clone(): Player {
        return new Player(this.id, this.position, this.points);
    }
}

interface Result {
    playerWins: number[];
}

const players = [new Player('1', input[0]), new Player('2', input[1])];

console.log('roll distribution', rollDistribution);

function diriacFork(
    players: Player[],
    playerTurn: number,
    [roll, count]: number[]
): Result {
    const player = players[playerTurn];

    const move = roll;

    let newPosition = player.position + move;
    while (newPosition > 10) {
        newPosition -= 10;
    }

    player.position = newPosition;
    player.points += newPosition;

    if (player.isWinner()) {
        const playerWins = [0, 0];
        playerWins[playerTurn] += count;
        return { playerWins };
    }

    return diriacRound(players, (playerTurn + 1) % 2, count);
}

function diriacRound(
    players: Player[],
    playerTurn: number,
    count: number
): Result {
    const playerWins = [0, 0];
    for (const d of rollDistribution) {
        const result = diriacFork(
            players.map((p) => p.clone()),
            playerTurn,
            d
        );
        playerWins[0] += result.playerWins[0] * count;
        playerWins[1] += result.playerWins[1] * count;
    }

    return { playerWins };
}

const result = diriacRound(players, 0, 1);

console.log(result, result.playerWins[0] > result.playerWins[1]);
