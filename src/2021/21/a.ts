import { input21 } from './input';

class DD100 {
    public rolls = 0;

    roll(): number {
        const value = (this.rolls % 100) + 1;
        this.rolls++;
        return value;
    }
}

class Player {
    public points = 0;
    constructor(
        public id: string,
        public position = 1
    ) {}
    isWinner() {
        return this.points >= 1000;
    }
}

const input = input21;
const die = new DD100();
const players = [new Player('1', input[0]), new Player('2', input[1])];
let playerTurn = 0;

let winner = false;
while (!winner) {
    const player = players[playerTurn];
    const move = die.roll() + die.roll() + die.roll();
    let newPosition = player.position + move;
    while (newPosition > 10) {
        newPosition -= 10;
    }

    player.position = newPosition;
    player.points += newPosition;

    if (player.isWinner()) {
        winner = true;
    }

    playerTurn = (playerTurn + 1) % 2;
}

console.log(players[playerTurn].points * die.rolls);
