export default class Ship {
    /**
     * @param {number} length
     */
    constructor(length) {
        this.body = [];
        for (let i = 0; i < length; i++) this.body.push(true);
    }

    /**
     * @param {number} position
     */
    hit(position) {
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
