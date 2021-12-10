export default class Ship {
    body: boolean[] = [];
    size: number

    constructor(length: number) {
        this.size = length;
        for (let i = 0; i < length; i++) this.body.push(true);
    }

    init() {
        this.body.fill(true);
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
