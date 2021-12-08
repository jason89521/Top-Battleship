export default class Ship {
    body: boolean[] = [];

    /**
     * @param {number} length
     */
    constructor(length: number) {
        for (let i = 0; i < length; i++) this.body.push(true);
    }

    hit(position: number) {
        if (!!this.body.at(position)) {
            this.body[position] = false;
            return true;
        }
        return false;
    }

    isSunk() {
        return !this.body.includes(true);
    }
}
