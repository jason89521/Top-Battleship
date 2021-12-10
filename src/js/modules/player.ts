import Gameboard from './gameboard';

export default class Player {
    gameboard = new Gameboard();

    constructor() {}

    init() {
        this.gameboard.init();
    }

    attack(row: number, col: number, opponent: Player) {
        return opponent.gameboard.receiveAttack(row, col);
    }

    isValidPosToAttack(row: number, col: number) {
        return !this.gameboard.board[row][col].isHit;
    }

    getSelection(opponent: Player) {
        const opponentBoard = opponent.gameboard.board;
        const boardSize = 10;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!opponentBoard[row][col].isHit) {
                    return [row, col];
                }
            }
        }
    }
}
