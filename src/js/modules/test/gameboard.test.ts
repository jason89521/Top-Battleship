import Gameboard from '../gameboard';

describe('placeShip function', () => {
    const gameboard = new Gameboard();
    test('place on the appropriate position vertically', () => {
        expect(gameboard.placeShip({ x: 0, y: 0 }, true)).toBeTruthy();
        const shipLength = gameboard.ships[gameboard.placeOrder - 1].body.length;
        for (let i = 0; i < shipLength; i++)
            expect(gameboard.board[0][i]).toMatchObject({ isShip: true, shipOrder: 0, shipBodyPos: i });
    });
    test('place on the appropriate position horizontally', () => {
        expect(gameboard.placeShip({ x: 1, y: 0 }, false)).toBeTruthy();
        const shipLength = gameboard.ships[gameboard.placeOrder - 1].body.length;
        for (let i = 0; i < shipLength; i++)
            expect(gameboard.board[1 + i][0]).toMatchObject({ isShip: true, shipOrder: 1, shipBodyPos: i });
    });
    test('place on the position that has placed a ship', () => {
        expect(gameboard.placeShip({ x: 0, y: 0 }, true)).toBeFalsy();
    });
    test('place on the position that is out of the board', () => {
        expect(gameboard.placeShip({ x: 9, y: 9 }, true)).toBeFalsy();
    });
    test('place the ship when all ships is placed', () => {
        expect(gameboard.placeShip({ x: 0, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 1, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 2, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 3, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 4, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 5, y: 2 })).toBeTruthy();
        expect(gameboard.placeShip({ x: 6, y: 2 })).toBeFalsy();
    });
});

describe('receiveAttack function', () => {
    const gameboard = new Gameboard();
});
