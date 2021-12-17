"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputs_1 = require("./inputs");
class BoardStatus {
    constructor(board) {
        this.values = [];
        for (const line of board) {
            const v = [];
            for (const item of line) {
                v.push({ number: item, called: false });
            }
            this.values.push(v);
        }
    }
    callNumber(number) {
        for (const line of this.values) {
            for (const value of line) {
                if (value.number === number) {
                    value.called = true;
                    return;
                }
            }
        }
    }
    isWinner() {
        for (const line of this.values) {
            if (line.every((x) => x.called === true)) {
                return true;
            }
        }
        for (let i = 0; i < this.values[0].length; i++) {
            let win = true;
            for (let j = 0; j < this.values.length; j++) {
                win = win && this.values[j][i].called;
            }
            if (win) {
                return true;
            }
        }
        return false;
    }
    calculate(justCalled) {
        let sumUncalled = 0;
        for (const line of this.values) {
            for (const value of line) {
                if (!value.called) {
                    sumUncalled += value.number;
                }
            }
        }
        return justCalled * sumUncalled;
    }
}
function main() {
    const boards = inputs_1.inputBoards.map((x) => new BoardStatus(x));
    let checkWin = false;
    for (const n of inputs_1.inputNumbers) {
        console.log('call', n);
        for (const b of boards) {
            b.callNumber(n);
        }
        for (let i = 0; i < boards.length; i++) {
            if (checkWin) {
                console.log(boards[i].calculate(n), n, boards[i].values);
                return;
            }
            else if (boards[i].isWinner()) {
                boards.splice(i, 1);
                i--;
            }
        }
        if (boards.length === 1) {
            checkWin = true;
        }
    }
}
main();
//# sourceMappingURL=b.js.map