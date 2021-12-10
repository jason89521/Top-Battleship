import Player from '../modules/player';

function getRowColFromDataset(dataset: DOMStringMap) {
    return [parseInt(dataset.row, 10), parseInt(dataset.col, 10)];
}

function isGameOver(player1: Player, player2: Player) {
    return player1.gameboard.isAllShipsSunk() || player2.gameboard.isAllShipsSunk();
}

export { getRowColFromDataset, isGameOver };
