/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/DOM/renderer.ts":
/*!********************************!*\
  !*** ./src/js/DOM/renderer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderShipOnBoard": () => (/* binding */ renderShipOnBoard),
/* harmony export */   "renderShootOnBoard": () => (/* binding */ renderShootOnBoard),
/* harmony export */   "generateCell": () => (/* binding */ generateCell),
/* harmony export */   "clearBoard": () => (/* binding */ clearBoard),
/* harmony export */   "showGameMessage": () => (/* binding */ showGameMessage),
/* harmony export */   "hideGameMessage": () => (/* binding */ hideGameMessage)
/* harmony export */ });
const getIndex = (row, col) => row * 10 + col;
function renderShipOnBoard(row, col, shipInfo, board) {
    const index = getIndex(row, col);
    const rowFactor = shipInfo.isVertical ? 10 : 0;
    const colFactor = shipInfo.isVertical ? 0 : 1;
    const children = board.children;
    for (let i = 0; i < shipInfo.size; i++) {
        children[index + i * (rowFactor + colFactor)].classList.add('board__cell--ship');
    }
}
function renderShootOnBoard(row, col, isShip, board) {
    const index = getIndex(row, col);
    const classToBeAdded = isShip ? 'board__cell--hit' : 'board__cell--miss';
    board.children[index].classList.add(classToBeAdded);
}
function generateCell(boards) {
    boards.forEach(board => {
        for (let row = 0; row < 10; row++)
            for (let col = 0; col < 10; col++) {
                const div = document.createElement('div');
                div.classList.add('board__cell');
                div.dataset.row = row.toString(10);
                div.dataset.col = col.toString(10);
                board.append(div);
            }
    });
}
function clearBoard(board) {
    const children = board.children;
    for (let i = 0; i < children.length; i++)
        children[i].className = 'board__cell';
}
function showGameMessage(gameMsg) {
    gameMsg.classList.remove('game-message--hidden');
}
function hideGameMessage(gameMsg) {
    gameMsg.classList.add('game-message--hidden');
}



/***/ }),

/***/ "./src/js/DOM/utils.ts":
/*!*****************************!*\
  !*** ./src/js/DOM/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRowColFromDataset": () => (/* binding */ getRowColFromDataset),
/* harmony export */   "enableBtn": () => (/* binding */ enableBtn),
/* harmony export */   "disableBtn": () => (/* binding */ disableBtn)
/* harmony export */ });
function getRowColFromDataset(dataset) {
    return [parseInt(dataset.row, 10), parseInt(dataset.col, 10)];
}
function enableBtn(btn) {
    btn.classList.add('btn--enabled');
    btn.classList.remove('btn--disabled');
}
function disableBtn(btn) {
    btn.classList.add('btn--disabled');
    btn.classList.remove('btn--enabled');
}



/***/ }),

/***/ "./src/js/modules/game.ts":
/*!********************************!*\
  !*** ./src/js/modules/game.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/js/modules/player.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Game_whoseTurn, _Game_players;

/**
 * initialize the game
 * place the ship
 *
 * while game is not over:
 *   if player1's turn:
 *     player1 attack player2's board
 *   else:
 *     player2 attack player1's board
 */
class Game {
    constructor() {
        _Game_whoseTurn.set(this, 1);
        _Game_players.set(this, [new _player__WEBPACK_IMPORTED_MODULE_0__["default"](false), new _player__WEBPACK_IMPORTED_MODULE_0__["default"](true)]);
    }
    get whoseTurn() {
        return __classPrivateFieldGet(this, _Game_whoseTurn, "f");
    }
    init(player1AI = false, player2AI = true) {
        __classPrivateFieldGet(this, _Game_players, "f")[0].init(player1AI);
        __classPrivateFieldGet(this, _Game_players, "f")[1].init(player2AI);
        __classPrivateFieldSet(this, _Game_whoseTurn, 1, "f");
    }
    isGameOver() {
        return __classPrivateFieldGet(this, _Game_players, "f")[0].gameboard.isAllShipsSunk() || __classPrivateFieldGet(this, _Game_players, "f")[1].gameboard.isAllShipsSunk();
    }
    isAllShipsPlaced(playerOrder) {
        return __classPrivateFieldGet(this, _Game_players, "f")[playerOrder].gameboard.isAllShipsPlaced();
    }
    isValidPosToPlace(playerOrder, row, col, isVertical) {
        const player = __classPrivateFieldGet(this, _Game_players, "f")[playerOrder];
        return player.gameboard.isValidPosToPlace(row, col, isVertical);
    }
    isValidPosToAttack(playerOrder, row, col) {
        const player = __classPrivateFieldGet(this, _Game_players, "f")[playerOrder];
        return player.gameboard.isValidPosToAttack(row, col);
    }
    getCurrentShipSize(playerOrder) {
        return __classPrivateFieldGet(this, _Game_players, "f")[playerOrder].gameboard.currentShipSize;
    }
    placeShip(playerOrder, row, col, isVertical) {
        const player = __classPrivateFieldGet(this, _Game_players, "f")[playerOrder];
        player.gameboard.placeShip(row, col, isVertical);
    }
    takeTurns(row = -1, col = -1) {
        const result = {
            isValid: false,
            isShip: false,
            row: row,
            col: col,
        };
        const player = __classPrivateFieldGet(this, _Game_players, "f")[this.whoseTurn - 1];
        const opponent = player === __classPrivateFieldGet(this, _Game_players, "f")[0] ? __classPrivateFieldGet(this, _Game_players, "f")[1] : __classPrivateFieldGet(this, _Game_players, "f")[0];
        if (player.isAI) {
            if (row !== -1 || col !== -1)
                return result;
            result.isValid = true;
            [result.row, result.col] = player.getSelection(opponent);
            result.isShip = player.attack(result.row, result.col, opponent);
        }
        else {
            if (row === -1 || col === -1)
                return result;
            result.isValid = true;
            result.isShip = player.attack(row, col, opponent);
        }
        __classPrivateFieldSet(this, _Game_whoseTurn, 3 - __classPrivateFieldGet(this, _Game_whoseTurn, "f"), "f");
        return result;
    }
}
_Game_whoseTurn = new WeakMap(), _Game_players = new WeakMap();


/***/ }),

/***/ "./src/js/modules/gameboard.ts":
/*!*************************************!*\
  !*** ./src/js/modules/gameboard.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/js/modules/ship.ts");
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Gameboard_instances, _Gameboard_boardSize, _Gameboard_placeOrder, _Gameboard_getFactor, _Gameboard_isOutOfBoard, _Gameboard_isEmpty;

class State {
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
class Gameboard {
    constructor() {
        _Gameboard_instances.add(this);
        _Gameboard_boardSize.set(this, 10);
        _Gameboard_placeOrder.set(this, 0);
        this.board = [];
        this.ships = [];
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++)
                this.board[i].push(new State());
        }
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5));
    }
    get currentShipSize() {
        return this.ships[__classPrivateFieldGet(this, _Gameboard_placeOrder, "f")].size;
    }
    init() {
        __classPrivateFieldSet(this, _Gameboard_placeOrder, 0, "f");
        this.ships.forEach(ship => ship.init());
        for (let i = 0; i < __classPrivateFieldGet(this, _Gameboard_boardSize, "f"); i++)
            this.board[i].forEach(value => value.init());
    }
    isAllShipsPlaced() {
        return __classPrivateFieldGet(this, _Gameboard_placeOrder, "f") >= 5;
    }
    isValidPosToPlace(row, col, isVertical) {
        return !__classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_isOutOfBoard).call(this, row, col, isVertical) && __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_isEmpty).call(this, row, col, isVertical);
    }
    isValidPosToAttack(row, col) {
        return !this.board[row][col].isHit;
    }
    placeShip(row, col, isVertical = true) {
        const shipLength = this.ships[__classPrivateFieldGet(this, _Gameboard_placeOrder, "f")].body.length;
        const [rowFactor, colFactor] = __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_getFactor).call(this, isVertical);
        for (let i = 0; i < shipLength; i++) {
            this.board[row + i * rowFactor][col + i * colFactor].isShip = true;
            this.board[row + i * rowFactor][col + i * colFactor].shipOrder = __classPrivateFieldGet(this, _Gameboard_placeOrder, "f");
            this.board[row + i * rowFactor][col + i * colFactor].shipBodyPos = i;
        }
        __classPrivateFieldSet(this, _Gameboard_placeOrder, __classPrivateFieldGet(this, _Gameboard_placeOrder, "f") + 1, "f");
    }
    receiveAttack(row, col) {
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
        for (let i = 0; i < this.ships.length; i++)
            if (!this.ships[i].isSunk())
                return false;
        return true;
    }
}
_Gameboard_boardSize = new WeakMap(), _Gameboard_placeOrder = new WeakMap(), _Gameboard_instances = new WeakSet(), _Gameboard_getFactor = function _Gameboard_getFactor(isVertical) {
    const rowFactor = isVertical ? 1 : 0;
    const colFactor = isVertical ? 0 : 1;
    return [rowFactor, colFactor];
}, _Gameboard_isOutOfBoard = function _Gameboard_isOutOfBoard(row, col, isVertical) {
    const [rowFactor, colFactor] = __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_getFactor).call(this, isVertical);
    const shipLength = this.ships[__classPrivateFieldGet(this, _Gameboard_placeOrder, "f")].body.length;
    for (let i = 0; i < shipLength; i++)
        if (row + i * rowFactor >= __classPrivateFieldGet(this, _Gameboard_boardSize, "f") || col + i * colFactor >= __classPrivateFieldGet(this, _Gameboard_boardSize, "f"))
            return true;
    return false;
}, _Gameboard_isEmpty = function _Gameboard_isEmpty(row, col, isVertical) {
    const [rowFactor, colFactor] = __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_getFactor).call(this, isVertical);
    const shipLength = this.ships[__classPrivateFieldGet(this, _Gameboard_placeOrder, "f")].body.length;
    for (let i = 0; i < shipLength; i++)
        if (this.board[row + i * rowFactor][col + i * colFactor].isShip)
            return false;
    return true;
};


/***/ }),

/***/ "./src/js/modules/player.ts":
/*!**********************************!*\
  !*** ./src/js/modules/player.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/js/modules/gameboard.ts");

class Player {
    constructor(isAI) {
        this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.isAI = isAI;
    }
    init(isAI) {
        this.isAI = isAI;
        this.gameboard.init();
    }
    attack(row, col, opponent) {
        return opponent.gameboard.receiveAttack(row, col);
    }
    getSelection(opponent) {
        const boardSize = 10;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (opponent.gameboard.isValidPosToAttack(row, col)) {
                    return [row, col];
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/js/modules/ship.ts":
/*!********************************!*\
  !*** ./src/js/modules/ship.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
    constructor(length) {
        this.body = [];
        this.size = length;
        for (let i = 0; i < length; i++)
            this.body.push(true);
    }
    init() {
        this.body.fill(true);
    }
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM/renderer */ "./src/js/DOM/renderer.ts");
/* harmony import */ var _DOM_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/utils */ "./src/js/DOM/utils.ts");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/game */ "./src/js/modules/game.ts");



const rotateInput = document.getElementById('rotate');
const rotateBtn = document.getElementById('rotate-btn');
const startBtn = document.getElementById('start-btn');
const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const gameMsg = document.getElementById('game-message');
const game = new _modules_game__WEBPACK_IMPORTED_MODULE_2__["default"]();
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.generateCell)(document.querySelectorAll('.board'));
game.placeShip(1, 0, 0, true);
game.placeShip(1, 0, 1, true);
game.placeShip(1, 0, 2, true);
game.placeShip(1, 0, 3, true);
game.placeShip(1, 0, 4, true);
board1.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.getRowColFromDataset)(target.dataset);
        if (isNaN(row))
            return;
        const isVertical = !rotateInput.checked;
        if (!game.isAllShipsPlaced(0) && game.isValidPosToPlace(0, row, col, isVertical)) {
            const shipInfo = { size: game.getCurrentShipSize(0), isVertical: isVertical };
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(row, col, shipInfo, board1);
            game.placeShip(0, row, col, isVertical);
            if (game.isAllShipsPlaced(0)) {
                startBtn.classList.add('btn--enabled');
                startBtn.classList.remove('btn--disabled');
            }
        }
    }
});
board2.addEventListener('click', event => {
    if (!game.isAllShipsPlaced(0) || game.isGameOver())
        return;
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.getRowColFromDataset)(target.dataset);
        if (isNaN(row))
            return;
        if (game.isValidPosToAttack(1, row, col)) {
            let result = game.takeTurns(row, col);
            if (!result.isValid)
                return;
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShootOnBoard)(row, col, result.isShip, board2);
            if (game.isGameOver()) {
                gameMsg.textContent = 'you win';
                (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.showGameMessage)(gameMsg);
                return;
            }
            result = game.takeTurns();
            if (!result.isValid)
                return;
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShootOnBoard)(result.row, result.col, result.isShip, board1);
            if (game.isGameOver()) {
                gameMsg.textContent = 'pc win';
                (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.showGameMessage)(gameMsg);
                return;
            }
        }
    }
});
startBtn.addEventListener('click', event => {
    if (!game.isAllShipsPlaced(0))
        return;
    board2.classList.remove('board--hidden');
    rotateInput.disabled = true;
    (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.disableBtn)(rotateBtn);
    (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.disableBtn)(startBtn);
});
document.getElementById('reset-btn').addEventListener('click', event => {
    (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.clearBoard)(board1);
    (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.clearBoard)(board2);
    board2.classList.add('board--hidden');
    (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.hideGameMessage)(gameMsg);
    (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.enableBtn)(rotateBtn);
    rotateInput.disabled = false;
    game.init();
    game.placeShip(1, 0, 0, true);
    game.placeShip(1, 0, 1, true);
    game.placeShip(1, 0, 2, true);
    game.placeShip(1, 0, 3, true);
    game.placeShip(1, 0, 4, true);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQix5REFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RDLDhEQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekIscURBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQixXQUFXLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUU3QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9ET00vcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvanMvRE9NL3V0aWxzLnRzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2pzL21vZHVsZXMvZ2FtZS50cyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL2dhbWVib2FyZC50cyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL3BsYXllci50cyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL3NoaXAudHMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwSW5mbyB9IGZyb20gJy4uL25ld1R5cGVzJztcblxuY29uc3QgZ2V0SW5kZXggPSAocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKSA9PiByb3cgKiAxMCArIGNvbDtcblxuZnVuY3Rpb24gcmVuZGVyU2hpcE9uQm9hcmQocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaGlwSW5mbzogU2hpcEluZm8sIGJvYXJkOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXgocm93LCBjb2wpO1xuICAgIGNvbnN0IHJvd0ZhY3RvciA9IHNoaXBJbmZvLmlzVmVydGljYWwgPyAxMCA6IDA7XG4gICAgY29uc3QgY29sRmFjdG9yID0gc2hpcEluZm8uaXNWZXJ0aWNhbCA/IDAgOiAxO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYm9hcmQuY2hpbGRyZW47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwSW5mby5zaXplOyBpKyspIHtcbiAgICAgICAgY2hpbGRyZW5baW5kZXggKyBpICogKHJvd0ZhY3RvciArIGNvbEZhY3RvcildLmNsYXNzTGlzdC5hZGQoJ2JvYXJkX19jZWxsLS1zaGlwJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJTaG9vdE9uQm9hcmQocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBpc1NoaXA6IGJvb2xlYW4sIGJvYXJkOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXgocm93LCBjb2wpO1xuICAgIGNvbnN0IGNsYXNzVG9CZUFkZGVkID0gaXNTaGlwID8gJ2JvYXJkX19jZWxsLS1oaXQnIDogJ2JvYXJkX19jZWxsLS1taXNzJztcbiAgICBib2FyZC5jaGlsZHJlbltpbmRleF0uY2xhc3NMaXN0LmFkZChjbGFzc1RvQmVBZGRlZCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2VsbChib2FyZHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgICBib2FyZHMuZm9yRWFjaChib2FyZCA9PiB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKylcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdib2FyZF9fY2VsbCcpO1xuICAgICAgICAgICAgICAgIGRpdi5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygxMCk7XG4gICAgICAgICAgICAgICAgZGl2LmRhdGFzZXQuY29sID0gY29sLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmQoZGl2KTtcbiAgICAgICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJCb2FyZChib2FyZDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGJvYXJkLmNoaWxkcmVuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIGNoaWxkcmVuW2ldLmNsYXNzTmFtZSA9ICdib2FyZF9fY2VsbCc7XG59XG5cbmZ1bmN0aW9uIHNob3dHYW1lTWVzc2FnZShnYW1lTXNnOiBIVE1MRWxlbWVudCkge1xuICAgIGdhbWVNc2cuY2xhc3NMaXN0LnJlbW92ZSgnZ2FtZS1tZXNzYWdlLS1oaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gaGlkZUdhbWVNZXNzYWdlKGdhbWVNc2c6IEhUTUxFbGVtZW50KSB7XG4gICAgZ2FtZU1zZy5jbGFzc0xpc3QuYWRkKCdnYW1lLW1lc3NhZ2UtLWhpZGRlbicpO1xufVxuXG5leHBvcnQgeyByZW5kZXJTaGlwT25Cb2FyZCwgcmVuZGVyU2hvb3RPbkJvYXJkLCBnZW5lcmF0ZUNlbGwsIGNsZWFyQm9hcmQsIHNob3dHYW1lTWVzc2FnZSwgaGlkZUdhbWVNZXNzYWdlIH07XG4iLCJmdW5jdGlvbiBnZXRSb3dDb2xGcm9tRGF0YXNldChkYXRhc2V0OiBET01TdHJpbmdNYXApIHtcbiAgICByZXR1cm4gW3BhcnNlSW50KGRhdGFzZXQucm93LCAxMCksIHBhcnNlSW50KGRhdGFzZXQuY29sLCAxMCldO1xufVxuXG5mdW5jdGlvbiBlbmFibGVCdG4oYnRuOiBIVE1MRWxlbWVudCkge1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tLWVuYWJsZWQnKTtcbiAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlQnRuKGJ0bjogSFRNTEVsZW1lbnQpIHtcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWVuYWJsZWQnKTtcbn1cblxuZXhwb3J0IHsgZ2V0Um93Q29sRnJvbURhdGFzZXQsIGVuYWJsZUJ0biwgZGlzYWJsZUJ0biB9O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5cbi8qKlxuICogaW5pdGlhbGl6ZSB0aGUgZ2FtZVxuICogcGxhY2UgdGhlIHNoaXBcbiAqXG4gKiB3aGlsZSBnYW1lIGlzIG5vdCBvdmVyOlxuICogICBpZiBwbGF5ZXIxJ3MgdHVybjpcbiAqICAgICBwbGF5ZXIxIGF0dGFjayBwbGF5ZXIyJ3MgYm9hcmRcbiAqICAgZWxzZTpcbiAqICAgICBwbGF5ZXIyIGF0dGFjayBwbGF5ZXIxJ3MgYm9hcmRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgI3dob3NlVHVybjogbnVtYmVyID0gMTtcbiAgICAjcGxheWVycyA9IFtuZXcgUGxheWVyKGZhbHNlKSwgbmV3IFBsYXllcih0cnVlKV07XG5cbiAgICBnZXQgd2hvc2VUdXJuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jd2hvc2VUdXJuO1xuICAgIH1cblxuICAgIGluaXQocGxheWVyMUFJID0gZmFsc2UsIHBsYXllcjJBSSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4jcGxheWVyc1swXS5pbml0KHBsYXllcjFBSSk7XG4gICAgICAgIHRoaXMuI3BsYXllcnNbMV0uaW5pdChwbGF5ZXIyQUkpO1xuICAgICAgICB0aGlzLiN3aG9zZVR1cm4gPSAxO1xuICAgIH1cblxuICAgIGlzR2FtZU92ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNwbGF5ZXJzWzBdLmdhbWVib2FyZC5pc0FsbFNoaXBzU3VuaygpIHx8IHRoaXMuI3BsYXllcnNbMV0uZ2FtZWJvYXJkLmlzQWxsU2hpcHNTdW5rKCk7XG4gICAgfVxuXG4gICAgaXNBbGxTaGlwc1BsYWNlZChwbGF5ZXJPcmRlcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNwbGF5ZXJzW3BsYXllck9yZGVyXS5nYW1lYm9hcmQuaXNBbGxTaGlwc1BsYWNlZCgpO1xuICAgIH1cblxuICAgIGlzVmFsaWRQb3NUb1BsYWNlKHBsYXllck9yZGVyOiBudW1iZXIsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLiNwbGF5ZXJzW3BsYXllck9yZGVyXTtcbiAgICAgICAgcmV0dXJuIHBsYXllci5nYW1lYm9hcmQuaXNWYWxpZFBvc1RvUGxhY2Uocm93LCBjb2wsIGlzVmVydGljYWwpO1xuICAgIH1cblxuICAgIGlzVmFsaWRQb3NUb0F0dGFjayhwbGF5ZXJPcmRlcjogbnVtYmVyLCByb3c6IG51bWJlciwgY29sOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy4jcGxheWVyc1twbGF5ZXJPcmRlcl07XG4gICAgICAgIHJldHVybiBwbGF5ZXIuZ2FtZWJvYXJkLmlzVmFsaWRQb3NUb0F0dGFjayhyb3csIGNvbCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFNoaXBTaXplKHBsYXllck9yZGVyOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BsYXllcnNbcGxheWVyT3JkZXJdLmdhbWVib2FyZC5jdXJyZW50U2hpcFNpemU7XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKHBsYXllck9yZGVyOiBudW1iZXIsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBwbGF5ZXIgPSB0aGlzLiNwbGF5ZXJzW3BsYXllck9yZGVyXTtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAocm93LCBjb2wsIGlzVmVydGljYWwpO1xuICAgIH1cblxuICAgIHRha2VUdXJucyhyb3cgPSAtMSwgY29sID0gLTEpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgaXNWYWxpZDogZmFsc2UsXG4gICAgICAgICAgICBpc1NoaXA6IGZhbHNlLFxuICAgICAgICAgICAgcm93OiByb3csXG4gICAgICAgICAgICBjb2w6IGNvbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcGxheWVyID0gdGhpcy4jcGxheWVyc1t0aGlzLndob3NlVHVybiAtIDFdO1xuICAgICAgICBjb25zdCBvcHBvbmVudCA9IHBsYXllciA9PT0gdGhpcy4jcGxheWVyc1swXSA/IHRoaXMuI3BsYXllcnNbMV0gOiB0aGlzLiNwbGF5ZXJzWzBdO1xuICAgICAgICBpZiAocGxheWVyLmlzQUkpIHtcbiAgICAgICAgICAgIGlmIChyb3cgIT09IC0xIHx8IGNvbCAhPT0gLTEpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIHJlc3VsdC5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIFtyZXN1bHQucm93LCByZXN1bHQuY29sXSA9IHBsYXllci5nZXRTZWxlY3Rpb24ob3Bwb25lbnQpO1xuICAgICAgICAgICAgcmVzdWx0LmlzU2hpcCA9IHBsYXllci5hdHRhY2socmVzdWx0LnJvdywgcmVzdWx0LmNvbCwgb3Bwb25lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJvdyA9PT0gLTEgfHwgY29sID09PSAtMSkgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICAgICAgcmVzdWx0LmlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzdWx0LmlzU2hpcCA9IHBsYXllci5hdHRhY2socm93LCBjb2wsIG9wcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI3dob3NlVHVybiA9IDMgLSB0aGlzLiN3aG9zZVR1cm47XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY2xhc3MgU3RhdGUge1xuICAgIGlzSGl0OiBib29sZWFuO1xuICAgIGlzU2hpcDogYm9vbGVhbjtcbiAgICBzaGlwT3JkZXI6IG51bWJlcjtcbiAgICBzaGlwQm9keVBvczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NoaXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwT3JkZXIgPSAtMTtcbiAgICAgICAgdGhpcy5zaGlwQm9keVBvcyA9IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICAjYm9hcmRTaXplID0gMTA7XG5cbiAgICAjcGxhY2VPcmRlciA9IDA7XG5cbiAgICBib2FyZDogU3RhdGVbXVtdID0gW107XG4gICAgc2hpcHM6IFNoaXBbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykgdGhpcy5ib2FyZFtpXS5wdXNoKG5ldyBTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMikpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMykpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMykpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoNCkpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoNSkpO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50U2hpcFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBzW3RoaXMuI3BsYWNlT3JkZXJdLnNpemU7XG4gICAgfVxuXG4gICAgI2dldEZhY3Rvcihpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHJvd0ZhY3RvciA9IGlzVmVydGljYWwgPyAxIDogMDtcbiAgICAgICAgY29uc3QgY29sRmFjdG9yID0gaXNWZXJ0aWNhbCA/IDAgOiAxO1xuICAgICAgICByZXR1cm4gW3Jvd0ZhY3RvciwgY29sRmFjdG9yXTtcbiAgICB9XG5cbiAgICAjaXNPdXRPZkJvYXJkKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBbcm93RmFjdG9yLCBjb2xGYWN0b3JdID0gdGhpcy4jZ2V0RmFjdG9yKGlzVmVydGljYWwpO1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLiNwbGFjZU9yZGVyXS5ib2R5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAocm93ICsgaSAqIHJvd0ZhY3RvciA+PSB0aGlzLiNib2FyZFNpemUgfHwgY29sICsgaSAqIGNvbEZhY3RvciA+PSB0aGlzLiNib2FyZFNpemUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAjaXNFbXB0eShyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgW3Jvd0ZhY3RvciwgY29sRmFjdG9yXSA9IHRoaXMuI2dldEZhY3Rvcihpc1ZlcnRpY2FsKTtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHRoaXMuc2hpcHNbdGhpcy4jcGxhY2VPcmRlcl0uYm9keS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSBpZiAodGhpcy5ib2FyZFtyb3cgKyBpICogcm93RmFjdG9yXVtjb2wgKyBpICogY29sRmFjdG9yXS5pc1NoaXApIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLiNwbGFjZU9yZGVyID0gMDtcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5pbml0KCkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuI2JvYXJkU2l6ZTsgaSsrKSB0aGlzLmJvYXJkW2ldLmZvckVhY2godmFsdWUgPT4gdmFsdWUuaW5pdCgpKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBzUGxhY2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGxhY2VPcmRlciA+PSA1O1xuICAgIH1cblxuICAgIGlzVmFsaWRQb3NUb1BsYWNlKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gIXRoaXMuI2lzT3V0T2ZCb2FyZChyb3csIGNvbCwgaXNWZXJ0aWNhbCkgJiYgdGhpcy4jaXNFbXB0eShyb3csIGNvbCwgaXNWZXJ0aWNhbCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZFBvc1RvQXR0YWNrKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gIXRoaXMuYm9hcmRbcm93XVtjb2xdLmlzSGl0O1xuICAgIH1cblxuICAgIHBsYWNlU2hpcChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSB0aGlzLnNoaXBzW3RoaXMuI3BsYWNlT3JkZXJdLmJvZHkubGVuZ3RoO1xuICAgICAgICBjb25zdCBbcm93RmFjdG9yLCBjb2xGYWN0b3JdID0gdGhpcy4jZ2V0RmFjdG9yKGlzVmVydGljYWwpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpICogcm93RmFjdG9yXVtjb2wgKyBpICogY29sRmFjdG9yXS5pc1NoaXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpICogcm93RmFjdG9yXVtjb2wgKyBpICogY29sRmFjdG9yXS5zaGlwT3JkZXIgPSB0aGlzLiNwbGFjZU9yZGVyO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpICogcm93RmFjdG9yXVtjb2wgKyBpICogY29sRmFjdG9yXS5zaGlwQm9keVBvcyA9IGk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNwbGFjZU9yZGVyICs9IDE7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayhyb3c6IG51bWJlciwgY29sOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0uaXNIaXQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtyb3ddW2NvbF0uaXNTaGlwKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwT3JkZXIgPSB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwT3JkZXI7XG4gICAgICAgICAgICBjb25zdCBzaGlwQm9keVBvcyA9IHRoaXMuYm9hcmRbcm93XVtjb2xdLnNoaXBCb2R5UG9zO1xuICAgICAgICAgICAgdGhpcy5zaGlwc1tzaGlwT3JkZXJdLmJvZHlbc2hpcEJvZHlQb3NdID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNBbGxTaGlwc1N1bmsoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykgaWYgKCF0aGlzLnNoaXBzW2ldLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBpc0FJOiBib29sZWFuXG5cbiAgICBjb25zdHJ1Y3Rvcihpc0FJOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNBSSA9IGlzQUk7XG4gICAgfVxuXG4gICAgaW5pdChpc0FJOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNBSSA9IGlzQUk7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkLmluaXQoKTtcbiAgICB9XG5cbiAgICBhdHRhY2socm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBvcHBvbmVudDogUGxheWVyKSB7XG4gICAgICAgIHJldHVybiBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0aW9uKG9wcG9uZW50OiBQbGF5ZXIpIHtcbiAgICAgICAgY29uc3QgYm9hcmRTaXplID0gMTA7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkU2l6ZTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvYXJkU2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAob3Bwb25lbnQuZ2FtZWJvYXJkLmlzVmFsaWRQb3NUb0F0dGFjayhyb3csIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgYm9keTogYm9vbGVhbltdID0gW107XG4gICAgc2l6ZTogbnVtYmVyXG5cbiAgICBjb25zdHJ1Y3RvcihsZW5ndGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNpemUgPSBsZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuYm9keS5wdXNoKHRydWUpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYm9keS5maWxsKHRydWUpO1xuICAgIH1cblxuICAgIGhpdChwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICghIXRoaXMuYm9keS5hdChwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keVtwb3NpdGlvbl0gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5ib2R5LmluY2x1ZGVzKHRydWUpO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgICBjbGVhckJvYXJkLFxuICAgIGdlbmVyYXRlQ2VsbCxcbiAgICBoaWRlR2FtZU1lc3NhZ2UsXG4gICAgcmVuZGVyU2hpcE9uQm9hcmQsXG4gICAgcmVuZGVyU2hvb3RPbkJvYXJkLFxuICAgIHNob3dHYW1lTWVzc2FnZSxcbn0gZnJvbSAnLi9ET00vcmVuZGVyZXInO1xuaW1wb3J0IHsgZGlzYWJsZUJ0biwgZW5hYmxlQnRuLCBnZXRSb3dDb2xGcm9tRGF0YXNldCB9IGZyb20gJy4vRE9NL3V0aWxzJztcbmltcG9ydCBHYW1lIGZyb20gJy4vbW9kdWxlcy9nYW1lJztcblxuY29uc3Qgcm90YXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJykgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUtYnRuJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKTtcbmNvbnN0IGJvYXJkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZDEnKTtcbmNvbnN0IGJvYXJkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZDInKTtcbmNvbnN0IGdhbWVNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1tZXNzYWdlJyk7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZSgpO1xuXG5nZW5lcmF0ZUNlbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkJykpO1xuXG5nYW1lLnBsYWNlU2hpcCgxLCAwLCAwLCB0cnVlKTtcbmdhbWUucGxhY2VTaGlwKDEsIDAsIDEsIHRydWUpO1xuZ2FtZS5wbGFjZVNoaXAoMSwgMCwgMiwgdHJ1ZSk7XG5nYW1lLnBsYWNlU2hpcCgxLCAwLCAzLCB0cnVlKTtcbmdhbWUucGxhY2VTaGlwKDEsIDAsIDQsIHRydWUpO1xuXG5ib2FyZDEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gZ2V0Um93Q29sRnJvbURhdGFzZXQodGFyZ2V0LmRhdGFzZXQpO1xuICAgICAgICBpZiAoaXNOYU4ocm93KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBpc1ZlcnRpY2FsID0gIXJvdGF0ZUlucHV0LmNoZWNrZWQ7XG4gICAgICAgIGlmICghZ2FtZS5pc0FsbFNoaXBzUGxhY2VkKDApICYmIGdhbWUuaXNWYWxpZFBvc1RvUGxhY2UoMCwgcm93LCBjb2wsIGlzVmVydGljYWwpKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwSW5mbyA9IHsgc2l6ZTogZ2FtZS5nZXRDdXJyZW50U2hpcFNpemUoMCksIGlzVmVydGljYWw6IGlzVmVydGljYWwgfTtcbiAgICAgICAgICAgIHJlbmRlclNoaXBPbkJvYXJkKHJvdywgY29sLCBzaGlwSW5mbywgYm9hcmQxKTtcbiAgICAgICAgICAgIGdhbWUucGxhY2VTaGlwKDAsIHJvdywgY29sLCBpc1ZlcnRpY2FsKTtcbiAgICAgICAgICAgIGlmIChnYW1lLmlzQWxsU2hpcHNQbGFjZWQoMCkpIHtcbiAgICAgICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tLWVuYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuYm9hcmQyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGlmICghZ2FtZS5pc0FsbFNoaXBzUGxhY2VkKDApIHx8IGdhbWUuaXNHYW1lT3ZlcigpKSByZXR1cm47XG5cbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBnZXRSb3dDb2xGcm9tRGF0YXNldCh0YXJnZXQuZGF0YXNldCk7XG4gICAgICAgIGlmIChpc05hTihyb3cpKSByZXR1cm47XG4gICAgICAgIGlmIChnYW1lLmlzVmFsaWRQb3NUb0F0dGFjaygxLCByb3csIGNvbCkpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBnYW1lLnRha2VUdXJucyhyb3csIGNvbCk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKSByZXR1cm47XG4gICAgICAgICAgICByZW5kZXJTaG9vdE9uQm9hcmQocm93LCBjb2wsIHJlc3VsdC5pc1NoaXAsIGJvYXJkMik7XG5cbiAgICAgICAgICAgIGlmIChnYW1lLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgICAgIGdhbWVNc2cudGV4dENvbnRlbnQgPSAneW91IHdpbic7XG4gICAgICAgICAgICAgICAgc2hvd0dhbWVNZXNzYWdlKGdhbWVNc2cpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gZ2FtZS50YWtlVHVybnMoKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQpIHJldHVybjtcbiAgICAgICAgICAgIHJlbmRlclNob290T25Cb2FyZChyZXN1bHQucm93LCByZXN1bHQuY29sLCByZXN1bHQuaXNTaGlwLCBib2FyZDEpO1xuICAgICAgICAgICAgaWYgKGdhbWUuaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICAgICAgZ2FtZU1zZy50ZXh0Q29udGVudCA9ICdwYyB3aW4nO1xuICAgICAgICAgICAgICAgIHNob3dHYW1lTWVzc2FnZShnYW1lTXNnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgaWYgKCFnYW1lLmlzQWxsU2hpcHNQbGFjZWQoMCkpIHJldHVybjtcblxuICAgIGJvYXJkMi5jbGFzc0xpc3QucmVtb3ZlKCdib2FyZC0taGlkZGVuJyk7XG4gICAgcm90YXRlSW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGRpc2FibGVCdG4ocm90YXRlQnRuKTtcbiAgICBkaXNhYmxlQnRuKHN0YXJ0QnRuKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgY2xlYXJCb2FyZChib2FyZDEpO1xuICAgIGNsZWFyQm9hcmQoYm9hcmQyKTtcbiAgICBib2FyZDIuY2xhc3NMaXN0LmFkZCgnYm9hcmQtLWhpZGRlbicpO1xuICAgIGhpZGVHYW1lTWVzc2FnZShnYW1lTXNnKTtcblxuICAgIGVuYWJsZUJ0bihyb3RhdGVCdG4pO1xuICAgIHJvdGF0ZUlucHV0LmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICBnYW1lLmluaXQoKTtcbiAgICBnYW1lLnBsYWNlU2hpcCgxLCAwLCAwLCB0cnVlKTtcbiAgICBnYW1lLnBsYWNlU2hpcCgxLCAwLCAxLCB0cnVlKTtcbiAgICBnYW1lLnBsYWNlU2hpcCgxLCAwLCAyLCB0cnVlKTtcbiAgICBnYW1lLnBsYWNlU2hpcCgxLCAwLCAzLCB0cnVlKTtcbiAgICBnYW1lLnBsYWNlU2hpcCgxLCAwLCA0LCB0cnVlKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9