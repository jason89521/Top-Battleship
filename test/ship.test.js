import Ship from '../src/js/ship';

describe('properties', () => {
    const ship = new Ship(5);
    test('body', () => {
        expect(ship.body).toEqual([true, true, true, true, true]);
    });
    test("body's length", () => {
        expect(ship.body.length).toBe(5);
    });
});

describe('hit function', () => {
    const ship = new Ship(5);
    test('call hit with appropriate value', () => {
        expect(ship.hit(1)).toBeTruthy();
        expect(ship.body[1]).toBe(false);
    });
    test('call hit with inappropriate value', () => {
        const originalBody = ship.body.slice(0);
        expect(ship.hit(19)).toBeFalsy();
        expect(ship.body).toEqual(originalBody);
    });
    test('call hit with the position that was hit before', () => {
        const originalBody = ship.body.slice(0);
        expect(ship.hit(1)).toBeFalsy();
        expect(ship.body).toEqual(originalBody);
    });
});

describe('isSunk function', () => {
    const ship = new Ship(5);
    test('return false if the body contain true', () => {
        expect(ship.isSunk()).toBeFalsy();
    });
    test('return true if the body does not contain true', () => {
        ship.body.fill(false);
        expect(ship.isSunk()).toBeTruthy();
    });
});
