import Ship from './ship';

class State {
    /**
     * @param {boolean} isHit
     * @param {boolean} isShip
     * @param {number} shipOrder
     * @param {number} shipBodyPos
     */
    constructor(isHit = false, isShip = false, shipOrder = -1, shipBodyPos = -1) {
        this.isHit = isHit;
        this.isShip = isShip;
        this.shipOrder = shipOrder;
        this.shipBodyPos = shipBodyPos;
    }
}

export default class Gameboard {
    _boardSize = 10;

    placeOrder = 0;

    constructor() {
        this.board = [];
        this.ships = [];
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++) this.board[i].push(new State());
        }
        this.ships.push(new Ship(2), new Ship(2));
        this.ships.push(new Ship(3), new Ship(3));
        this.ships.push(new Ship(4), new Ship(4));
        this.ships.push(new Ship(5), new Ship(5));
    }

    _getFactor(isVertical) {
        const xFactor = isVertical ? 0 : 1;
        const yFactor = isVertical ? 1 : 0;
        return [xFactor, yFactor];
    }

    _isOutOfBoard(x, y, isVertical, shipLength) {
        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++)
            if (x + i * xFactor >= this._boardSize || y + i * yFactor >= this._boardSize) return true;

        return false;
    }

    _isEmpty(x, y, isVertical, shipLength) {
        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++) if (this.board[x + i * xFactor][y + i * yFactor].isShip) return false;

        return true;
    }

    _isValidPos(x, y, isVertical, shipLength) {
        return !this._isOutOfBoard(x, y, isVertical, shipLength) && this._isEmpty(x, y, isVertical, shipLength);
    }

    /**
     * @param {{x: number, y:number}} coordinate
     * @param {boolean} isVertical
     * @returns whether the ship is placed correctly
     */
    placeShip(coordinate, isVertical = true) {
        if (this.placeOrder >= this.ships.length) return false;

        const x = coordinate.x;
        const y = coordinate.y;
        const shipLength = this.ships[this.placeOrder].body.length;
        if (!this._isValidPos(x, y, isVertical, shipLength)) return false;

        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++) {
            this.board[x + i * xFactor][y + i * yFactor].isShip = true;
            this.board[x + i * xFactor][y + i * yFactor].shipOrder = this.placeOrder;
            this.board[x + i * xFactor][y + i * yFactor].shipBodyPos = i;
        }

        this.placeOrder += 1;
        return true;
    }

    receiveAttack(targetRow, targetCol) {}
}
