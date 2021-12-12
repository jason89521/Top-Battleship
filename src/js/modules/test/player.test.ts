import Player from '../player';

const player1 = new Player(false);
const player2 = new Player(false);
describe('attack', () => {
    beforeAll(() => {
        player1.init(false);
        player2.init(false);
    });

    test('attck on empty ', () => {
        expect(player1.attack(9, 9, player2)).toBeFalsy();
    });
    test('attack on ship', () => {
        player2.gameboard.placeShip(0, 0);
        expect(player1.attack(0, 0, player2)).toBeTruthy();
    });
});

describe('getSelection', () => {
    beforeAll(() => {
        player1.init(false);
        player2.init(false);
    });

    test('return [0, 0]', () => {
        expect(player1.getSelection(player2)).toEqual([0, 0]);
    });
    test('return [0, 1]', () => {
        player1.attack(0, 0, player2);
        expect(player1.getSelection(player2)).toEqual([0, 1]);
    });
});
