import Gameboard from './gameboard';

export default class Player {
    gameboard = new Gameboard();
    isAI: boolean

    constructor(isAI: boolean) {
        this.isAI = isAI;
    }

    init(isAI: boolean) {
        this.isAI = isAI;
        this.gameboard.init();
    }

    attack(row: number, col: number, opponent: Player) {
        return opponent.gameboard.receiveAttack(row, col);
    }

    getSelection(opponent: Player) {
        const boardSize = 10;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (opponent.gameboard.isValidPosToAttack(row, col)) {
                    return [row, col];
                }
            }
        }
    }
}
