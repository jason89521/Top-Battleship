import {
    clearBoard,
    generateCell,
    hideGameMessage,
    renderShipOnBoard,
    renderShootOnBoard,
    showGameMessage,
} from './DOM/renderer';
import { disableBtn, enableBtn, getRowColFromDataset } from './DOM/utils';
import Game from './modules/game';

const rotateInput = document.getElementById('rotate') as HTMLInputElement;
const rotateBtn = document.getElementById('rotate-btn');
const startBtn = document.getElementById('start-btn');
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const gameMsg = document.getElementById('game-message');

const game = new Game();

generateCell(document.querySelectorAll('.board'));

game.placeShip(1, 0, 0, true);
game.placeShip(1, 0, 1, true);
game.placeShip(1, 0, 2, true);
game.placeShip(1, 0, 3, true);
game.placeShip(1, 0, 4, true);

board1.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = getRowColFromDataset(target.dataset);
        if (isNaN(row)) return;
        const isVertical = !rotateInput.checked;
        if (!game.isAllShipsPlaced(0) && game.isValidPosToPlace(0, row, col, isVertical)) {
            const shipInfo = { size: game.getCurrentShipSize(0), isVertical: isVertical };
            renderShipOnBoard(row, col, shipInfo, board1);
            game.placeShip(0, row, col, isVertical);
            if (game.isAllShipsPlaced(0)) {
                startBtn.classList.add('btn--enabled');
                startBtn.classList.remove('btn--disabled');
            }
        }
    }
});

board2.addEventListener('click', event => {
    if (!game.isAllShipsPlaced(0) || game.isGameOver()) return;

    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = getRowColFromDataset(target.dataset);
        if (isNaN(row)) return;
        if (game.isValidPosToAttack(1, row, col)) {
            let result = game.takeTurns(row, col);
            if (!result.isValid) return;
            renderShootOnBoard(row, col, result.isShip, board2);

            if (game.isGameOver()) {
                gameMsg.textContent = 'you win';
                showGameMessage(gameMsg);
                return;
            }

            result = game.takeTurns();
            if (!result.isValid) return;
            renderShootOnBoard(result.row, result.col, result.isShip, board1);
            if (game.isGameOver()) {
                gameMsg.textContent = 'pc win';
                showGameMessage(gameMsg);
                return;
            }
        }
    }
});

startBtn.addEventListener('click', event => {
    if (!game.isAllShipsPlaced(0)) return;

    board2.classList.remove('board--hidden');
    rotateInput.disabled = true;
    disableBtn(rotateBtn);
    disableBtn(startBtn);
});

document.getElementById('reset-btn').addEventListener('click', event => {
    clearBoard(board1);
    clearBoard(board2);
    board2.classList.add('board--hidden');
    hideGameMessage(gameMsg);

    enableBtn(rotateBtn);
    rotateInput.disabled = false;

    game.init();
    game.placeShip(1, 0, 0, true);
    game.placeShip(1, 0, 1, true);
    game.placeShip(1, 0, 2, true);
    game.placeShip(1, 0, 3, true);
    game.placeShip(1, 0, 4, true);
});
