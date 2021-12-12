import Ship from './ship';

class State {
    isHit: boolean;
    isShip: boolean;
    shipOrder: number;
    shipBodyPos: number;

    constructor() {
        this.init();
    }

    init() {
        this.isHit = false;
        this.isShip = false;
        this.shipOrder = -1;
        this.shipBodyPos = -1;
    }
}

export default class Gameboard {
    #boardSize = 10;

    #placeOrder = 0;

    board: State[][] = [];
    ships: Ship[] = [];

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++) this.board[i].push(new State());
        }
        this.ships.push(new Ship(2));
        this.ships.push(new Ship(3));
        this.ships.push(new Ship(3));
        this.ships.push(new Ship(4));
        this.ships.push(new Ship(5));
    }

    get currentShipSize() {
        return this.ships[this.#placeOrder].size;
    }

    #getFactor(isVertical: boolean) {
        const rowFactor = isVertical ? 1 : 0;
        const colFactor = isVertical ? 0 : 1;
        return [rowFactor, colFactor];
    }

    #isOutOfBoard(row: number, col: number, isVertical: boolean) {
        const [rowFactor, colFactor] = this.#getFactor(isVertical);
        const shipLength = this.ships[this.#placeOrder].body.length;
        for (let i = 0; i < shipLength; i++)
            if (row + i * rowFactor >= this.#boardSize || col + i * colFactor >= this.#boardSize) return true;

        return false;
    }

    #isEmpty(row: number, col: number, isVertical: boolean) {
        const [rowFactor, colFactor] = this.#getFactor(isVertical);
        const shipLength = this.ships[this.#placeOrder].body.length;
        for (let i = 0; i < shipLength; i++) if (this.board[row + i * rowFactor][col + i * colFactor].isShip) return false;

        return true;
    }

    init() {
        this.#placeOrder = 0;
        this.ships.forEach(ship => ship.init());
        for (let i = 0; i < this.#boardSize; i++) this.board[i].forEach(value => value.init());
    }

    isAllShipsPlaced() {
        return this.#placeOrder >= 5;
    }

    isValidPosToPlace(row: number, col: number, isVertical: boolean) {
        return !this.#isOutOfBoard(row, col, isVertical) && this.#isEmpty(row, col, isVertical);
    }

    isValidPosToAttack(row: number, col: number) {
        return !this.board[row][col].isHit;
    }

    placeShip(row: number, col: number, isVertical: boolean = true) {
        const shipLength = this.ships[this.#placeOrder].body.length;
        const [rowFactor, colFactor] = this.#getFactor(isVertical);
        for (let i = 0; i < shipLength; i++) {
            this.board[row + i * rowFactor][col + i * colFactor].isShip = true;
            this.board[row + i * rowFactor][col + i * colFactor].shipOrder = this.#placeOrder;
            this.board[row + i * rowFactor][col + i * colFactor].shipBodyPos = i;
        }

        this.#placeOrder += 1;
    }

    receiveAttack(row: number, col: number) {
        this.board[row][col].isHit = true;
        if (this.board[row][col].isShip) {
            const shipOrder = this.board[row][col].shipOrder;
            const shipBodyPos = this.board[row][col].shipBodyPos;
            this.ships[shipOrder].body[shipBodyPos] = false;
            return true;
        }
        return false;
    }

    isAllShipsSunk() {
        for (let i = 0; i < this.ships.length; i++) if (!this.ships[i].isSunk()) return false;
        return true;
    }
}
