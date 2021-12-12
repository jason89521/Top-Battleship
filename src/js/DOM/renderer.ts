import { ShipInfo } from '../newTypes';

const getIndex = (row: number, col: number) => row * 10 + col;

function renderShipOnBoard(row: number, col: number, shipInfo: ShipInfo, board: HTMLElement) {
    const index = getIndex(row, col);
    const rowFactor = shipInfo.isVertical ? 10 : 0;
    const colFactor = shipInfo.isVertical ? 0 : 1;
    const children = board.children;
    for (let i = 0; i < shipInfo.size; i++) {
        children[index + i * (rowFactor + colFactor)].classList.add('board__cell--ship');
    }
}

function renderShootOnBoard(row: number, col: number, isShip: boolean, board: HTMLElement) {
    const index = getIndex(row, col);
    const classToBeAdded = isShip ? 'board__cell--hit' : 'board__cell--miss';
    board.children[index].classList.add(classToBeAdded);
}

function generateCell(boards: NodeListOf<Element>) {
    boards.forEach(board => {
        for (let row = 0; row < 10; row++)
            for (let col = 0; col < 10; col++) {
                const div = document.createElement('div');
                div.classList.add('board__cell');
                div.dataset.row = row.toString(10);
                div.dataset.col = col.toString(10);
                board.append(div);
            }
    });
}

function clearBoard(board: HTMLElement) {
    const children = board.children;
    for (let i = 0; i < children.length; i++) children[i].className = 'board__cell';
}

function showGameMessage(gameMsg: HTMLElement) {
    gameMsg.classList.remove('game-message--hidden');
}

function hideGameMessage(gameMsg: HTMLElement) {
    gameMsg.classList.add('game-message--hidden');
}

export { renderShipOnBoard, renderShootOnBoard, generateCell, clearBoard, showGameMessage, hideGameMessage };
