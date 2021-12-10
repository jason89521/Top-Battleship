import Gameboard from '../gameboard';

describe('isAllShipsPlaced', () => {
    const gameboard = new Gameboard();

    test('return false when there is no ship been placed', () => {
        expect(gameboard.isAllShipsPlaced()).toBeFalsy();
    });
    test('return true when all ships has been placed', () => {
        gameboard.placeShip(0, 0);
        gameboard.placeShip(0, 1);
        gameboard.placeShip(0, 2);
        gameboard.placeShip(0, 3);
        gameboard.placeShip(0, 4);
        expect(gameboard.isAllShipsPlaced()).toBeTruthy();
    });
});

describe('isValidPos', () => {
    const gameboard = new Gameboard();

    test('return true when the position is valid', () => {
        expect(gameboard.isValidPos(0, 0, true,)).toBeTruthy();
    });
    test('return false when the position has a ship already', () => {
        gameboard.board[0][0].isShip = true;
        gameboard.board[0][1].isShip = true;
        expect(gameboard.isValidPos(0, 0, true)).toBeFalsy();
    });
    test('return false when the ship is out of bound ', () => {
        expect(gameboard.isValidPos(9, 9, true)).toBeFalsy();
    });
});

describe('placeShip', () => {
    const gameboard = new Gameboard();
    test('place on the appropriate position vertically', () => {
        gameboard.placeShip(0, 0, true);
        for (let i = 0; i < 2; i++)
            expect(gameboard.board[i][0]).toMatchObject({ isShip: true, shipOrder: 0, shipBodyPos: i });
    });
    test('place on the appropriate position horizontally', () => {
        gameboard.placeShip(0, 1, false);
        for (let i = 0; i < 3; i++)
            expect(gameboard.board[0][1 + i]).toMatchObject({ isShip: true, shipOrder: 1, shipBodyPos: i });
    });
});

describe('receiveAttack function', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 1);
    gameboard.placeShip(1, 2);
    gameboard.placeShip(1, 3);
    gameboard.placeShip(1, 4);
    gameboard.placeShip(1, 5);
    test('receive attack on empty', () => {
        expect(gameboard.receiveAttack(0, 0)).toBeFalsy();
        expect(gameboard.board[0][0].isHit).toBeTruthy();
    });
    test('receive attack on ship', () => {
        expect(gameboard.receiveAttack(1, 1)).toBeTruthy();
        expect(gameboard.board[1][1].isHit).toBeTruthy();
        expect(gameboard.ships[0].body[0]).toBeFalsy();
    });
});

describe('isAllShipsSunk', () => {
    const gameboard = new Gameboard();
    test('return false when no ship is sunk', () => {
        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });
    test('return false when one ship is sunk', () => {
        gameboard.ships[0].body.fill(false);
        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });
    test('return false when two ships is sunk', () => {
        gameboard.ships[1].body.fill(false);
        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });
    test('return false when three ships is sunk', () => {
        gameboard.ships[2].body.fill(false);
        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });
    test('return false when four ships is sunk', () => {
        gameboard.ships[3].body.fill(false);
        expect(gameboard.isAllShipsSunk()).toBeFalsy();
    });
    test('return true when all ships is sunk', () => {
        gameboard.ships[4].body.fill(false);
        expect(gameboard.isAllShipsSunk()).toBeTruthy();
    });
});
