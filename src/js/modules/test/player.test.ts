import Player from '../player';

const player1 = new Player();
const player2 = new Player();
describe('attack', () => {
    beforeAll(() => {
        player1.init();
        player2.init();
    });

    test('attck on empty ', () => {
        expect(player1.attack(9, 9, player2)).toBeFalsy();
    });
    test('attack on ship', () => {
        player2.gameboard.placeShip(0, 0);
        expect(player1.attack(0, 0, player2)).toBeTruthy();
    });
});

describe('isValidPosToAttack', () => {
    beforeAll(() => {
        player1.init();
        player2.init();
    });

    test('return true when the position is valid ', () => {
        expect(player2.isValidPosToAttack(0, 0)).toBeTruthy();
    });
    test('return false when the position has been attacked', () => {
        player2.gameboard.board[0][0].isHit = true;
        expect(player2.isValidPosToAttack(0, 0)).toBeFalsy();
    });
});

describe('getSelection', () => {
    beforeAll(() => {
        player1.init();
        player2.init();
    });

    test('return [0, 0]', () => {
        expect(player1.getSelection(player2)).toEqual([0, 0]);
    });
    test('return [0, 1]', () => {
        player1.attack(0, 0, player2);
        expect(player1.getSelection(player2)).toEqual([0, 1]);
    });
});
