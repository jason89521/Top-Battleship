import { generateBoard, renderShipOnBoard, renderShootOnBoard } from './DOM/renderer';
import { getRowColFromDataset, isGameOver } from './DOM/utils';
import Player from './modules/player';

const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const player1 = new Player();
const player2 = new Player();

let whoseTurn = 1;

board1.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = getRowColFromDataset(target.dataset);
        if (!player1.gameboard.isAllShipsPlaced() && player1.gameboard.isValidPos(row, col, true)) {
            const shipInfo = { size: player1.gameboard.currentShipSize, isVertical: true };
            renderShipOnBoard(row, col, shipInfo, board1);
            player1.gameboard.placeShip(row, col, true);
        } else {
            console.log('there is no ship or the position is invalid');
        }
    }
});

board2.addEventListener('click', event => {
    // if the ships haven't been placed || the game is over
    if (!player1.gameboard.isAllShipsPlaced() || isGameOver(player1, player2)) return;

    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = getRowColFromDataset(target.dataset);
        /**
         * if the position is valid
         *   attack the position
         *   if player2 is alive
         *     player2 attack
         */
        if (player2.isValidPosToAttack(row, col)) {
            const player1AttackResult = player1.attack(row, col, player2);
            renderShootOnBoard(row, col, player1AttackResult, board2);
            if(player2.gameboard.isAllShipsSunk()) return;
            const [attackRow, attackCol] = player2.getSelection(player1);
            const player2AttackResult = player2.attack(attackRow, attackCol, player1);
            renderShootOnBoard(attackRow, attackCol, player2AttackResult, board1);
        }
    }
});

document.getElementById('reset').addEventListener('click', event => {
    player1.init();
    player2.init();
});

generateBoard(document.querySelectorAll('.board'));

renderShipOnBoard(0, 0, { size: 2, isVertical: true }, board2);
renderShipOnBoard(0, 1, { size: 3, isVertical: true }, board2);
renderShipOnBoard(0, 2, { size: 3, isVertical: true }, board2);
renderShipOnBoard(0, 3, { size: 4, isVertical: true }, board2);
renderShipOnBoard(0, 4, { size: 5, isVertical: true }, board2);
player2.gameboard.placeShip(0, 0, true);
player2.gameboard.placeShip(0, 1, true);
player2.gameboard.placeShip(0, 2, true);
player2.gameboard.placeShip(0, 3, true);
player2.gameboard.placeShip(0, 4, true);
