import Player from './player';

/**
 * initialize the game
 * place the ship
 *
 * while game is not over:
 *   if player1's turn:
 *     player1 attack player2's board
 *   else:
 *     player2 attack player1's board
 */
export default class Game {
    #whoseTurn: number = 1;
    #players = [new Player(false), new Player(true)];

    get whoseTurn() {
        return this.#whoseTurn;
    }

    init(player1AI = false, player2AI = true) {
        this.#players[0].init(player1AI);
        this.#players[1].init(player2AI);
        this.#whoseTurn = 1;
    }

    isGameOver() {
        return this.#players[0].gameboard.isAllShipsSunk() || this.#players[1].gameboard.isAllShipsSunk();
    }

    isAllShipsPlaced(playerOrder: number) {
        return this.#players[playerOrder].gameboard.isAllShipsPlaced();
    }

    isValidPosToPlace(playerOrder: number, row: number, col: number, isVertical: boolean) {
        const player = this.#players[playerOrder];
        return player.gameboard.isValidPosToPlace(row, col, isVertical);
    }

    isValidPosToAttack(playerOrder: number, row: number, col: number) {
        const player = this.#players[playerOrder];
        return player.gameboard.isValidPosToAttack(row, col);
    }

    getCurrentShipSize(playerOrder: number) {
        return this.#players[playerOrder].gameboard.currentShipSize;
    }

    placeShip(playerOrder: number, row: number, col: number, isVertical: boolean) {
        const player = this.#players[playerOrder];
        player.gameboard.placeShip(row, col, isVertical);
    }

    takeTurns(row = -1, col = -1) {
        const result = {
            isValid: false,
            isShip: false,
            row: row,
            col: col,
        };
        const player = this.#players[this.whoseTurn - 1];
        const opponent = player === this.#players[0] ? this.#players[1] : this.#players[0];
        if (player.isAI) {
            if (row !== -1 || col !== -1) return result;

            result.isValid = true;
            [result.row, result.col] = player.getSelection(opponent);
            result.isShip = player.attack(result.row, result.col, opponent);
        } else {
            if (row === -1 || col === -1) return result;

            result.isValid = true;
            result.isShip = player.attack(row, col, opponent);
        }

        this.#whoseTurn = 3 - this.#whoseTurn;
        return result;
    }
}
