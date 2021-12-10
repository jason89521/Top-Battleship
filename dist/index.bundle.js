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
/* harmony export */   "generateBoard": () => (/* binding */ generateBoard)
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
function generateBoard(boards) {
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



/***/ }),

/***/ "./src/js/DOM/utils.ts":
/*!*****************************!*\
  !*** ./src/js/DOM/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRowColFromDataset": () => (/* binding */ getRowColFromDataset),
/* harmony export */   "isGameOver": () => (/* binding */ isGameOver)
/* harmony export */ });
function getRowColFromDataset(dataset) {
    return [parseInt(dataset.row, 10), parseInt(dataset.col, 10)];
}
function isGameOver(player1, player2) {
    return player1.gameboard.isAllShipsSunk() || player2.gameboard.isAllShipsSunk();
}



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
    isValidPos(row, col, isVertical) {
        return !__classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_isOutOfBoard).call(this, row, col, isVertical) && __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_isEmpty).call(this, row, col, isVertical);
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
    constructor() {
        this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    init() {
        this.gameboard.init();
    }
    attack(row, col, opponent) {
        return opponent.gameboard.receiveAttack(row, col);
    }
    isValidPosToAttack(row, col) {
        return !this.gameboard.board[row][col].isHit;
    }
    getSelection(opponent) {
        const opponentBoard = opponent.gameboard.board;
        const boardSize = 10;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!opponentBoard[row][col].isHit) {
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
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ "./src/js/modules/player.ts");



const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
const player1 = new _modules_player__WEBPACK_IMPORTED_MODULE_2__["default"]();
const player2 = new _modules_player__WEBPACK_IMPORTED_MODULE_2__["default"]();
let whoseTurn = 1;
board1.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.getRowColFromDataset)(target.dataset);
        if (!player1.gameboard.isAllShipsPlaced() && player1.gameboard.isValidPos(row, col, true)) {
            const shipInfo = { size: player1.gameboard.currentShipSize, isVertical: true };
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(row, col, shipInfo, board1);
            player1.gameboard.placeShip(row, col, true);
        }
        else {
            console.log('there is no ship or the position is invalid');
        }
    }
});
board2.addEventListener('click', event => {
    // if the ships haven't been placed || the game is over
    if (!player1.gameboard.isAllShipsPlaced() || (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.isGameOver)(player1, player2))
        return;
    const target = event.target;
    if (target instanceof HTMLElement) {
        const [row, col] = (0,_DOM_utils__WEBPACK_IMPORTED_MODULE_1__.getRowColFromDataset)(target.dataset);
        /**
         * if the position is valid
         *   attack the position
         *   if player2 is alive
         *     player2 attack
         */
        if (player2.isValidPosToAttack(row, col)) {
            const player1AttackResult = player1.attack(row, col, player2);
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShootOnBoard)(row, col, player1AttackResult, board2);
            if (player2.gameboard.isAllShipsSunk())
                return;
            const [attackRow, attackCol] = player2.getSelection(player1);
            const player2AttackResult = player2.attack(attackRow, attackCol, player1);
            (0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShootOnBoard)(attackRow, attackCol, player2AttackResult, board1);
        }
    }
});
document.getElementById('reset').addEventListener('click', event => {
    player1.init();
    player2.init();
});
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.generateBoard)(document.querySelectorAll('.board'));
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(0, 0, { size: 2, isVertical: true }, board2);
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(0, 1, { size: 3, isVertical: true }, board2);
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(0, 2, { size: 3, isVertical: true }, board2);
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(0, 3, { size: 4, isVertical: true }, board2);
(0,_DOM_renderer__WEBPACK_IMPORTED_MODULE_0__.renderShipOnBoard)(0, 4, { size: 5, isVertical: true }, board2);
player2.gameboard.placeShip(0, 0, true);
player2.gameboard.placeShip(0, 1, true);
player2.gameboard.placeShip(0, 2, true);
player2.gameboard.placeShip(0, 3, true);
player2.gameboard.placeShip(0, 4, true);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRCxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4QyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9qcy9ET00vcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvanMvRE9NL3V0aWxzLnRzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2pzL21vZHVsZXMvZ2FtZWJvYXJkLnRzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2pzL21vZHVsZXMvcGxheWVyLnRzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2pzL21vZHVsZXMvc2hpcC50cyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2pzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXBJbmZvIH0gZnJvbSAnLi4vbmV3VHlwZXMnO1xuXG5jb25zdCBnZXRJbmRleCA9IChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpID0+IHJvdyAqIDEwICsgY29sO1xuXG5mdW5jdGlvbiByZW5kZXJTaGlwT25Cb2FyZChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNoaXBJbmZvOiBTaGlwSW5mbywgYm9hcmQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRJbmRleChyb3csIGNvbCk7XG4gICAgY29uc3Qgcm93RmFjdG9yID0gc2hpcEluZm8uaXNWZXJ0aWNhbCA/IDEwIDogMDtcbiAgICBjb25zdCBjb2xGYWN0b3IgPSBzaGlwSW5mby5pc1ZlcnRpY2FsID8gMCA6IDE7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBib2FyZC5jaGlsZHJlbjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBJbmZvLnNpemU7IGkrKykge1xuICAgICAgICBjaGlsZHJlbltpbmRleCArIGkgKiAocm93RmFjdG9yICsgY29sRmFjdG9yKV0uY2xhc3NMaXN0LmFkZCgnYm9hcmRfX2NlbGwtLXNoaXAnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNob290T25Cb2FyZChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGlzU2hpcDogYm9vbGVhbiwgYm9hcmQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRJbmRleChyb3csIGNvbCk7XG4gICAgY29uc3QgY2xhc3NUb0JlQWRkZWQgPSBpc1NoaXAgPyAnYm9hcmRfX2NlbGwtLWhpdCcgOiAnYm9hcmRfX2NlbGwtLW1pc3MnO1xuICAgIGJvYXJkLmNoaWxkcmVuW2luZGV4XS5jbGFzc0xpc3QuYWRkKGNsYXNzVG9CZUFkZGVkKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVCb2FyZChib2FyZHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgICBib2FyZHMuZm9yRWFjaChib2FyZCA9PiB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKylcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdib2FyZF9fY2VsbCcpO1xuICAgICAgICAgICAgICAgIGRpdi5kYXRhc2V0LnJvdyA9IHJvdy50b1N0cmluZygxMCk7XG4gICAgICAgICAgICAgICAgZGl2LmRhdGFzZXQuY29sID0gY29sLnRvU3RyaW5nKDEwKTtcbiAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmQoZGl2KTtcbiAgICAgICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgcmVuZGVyU2hpcE9uQm9hcmQsIHJlbmRlclNob290T25Cb2FyZCwgZ2VuZXJhdGVCb2FyZCB9O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuLi9tb2R1bGVzL3BsYXllcic7XG5cbmZ1bmN0aW9uIGdldFJvd0NvbEZyb21EYXRhc2V0KGRhdGFzZXQ6IERPTVN0cmluZ01hcCkge1xuICAgIHJldHVybiBbcGFyc2VJbnQoZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZGF0YXNldC5jb2wsIDEwKV07XG59XG5cbmZ1bmN0aW9uIGlzR2FtZU92ZXIocGxheWVyMTogUGxheWVyLCBwbGF5ZXIyOiBQbGF5ZXIpIHtcbiAgICByZXR1cm4gcGxheWVyMS5nYW1lYm9hcmQuaXNBbGxTaGlwc1N1bmsoKSB8fCBwbGF5ZXIyLmdhbWVib2FyZC5pc0FsbFNoaXBzU3VuaygpO1xufVxuXG5leHBvcnQgeyBnZXRSb3dDb2xGcm9tRGF0YXNldCwgaXNHYW1lT3ZlciB9O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY2xhc3MgU3RhdGUge1xuICAgIGlzSGl0OiBib29sZWFuO1xuICAgIGlzU2hpcDogYm9vbGVhbjtcbiAgICBzaGlwT3JkZXI6IG51bWJlcjtcbiAgICBzaGlwQm9keVBvczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaXNIaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NoaXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwT3JkZXIgPSAtMTtcbiAgICAgICAgdGhpcy5zaGlwQm9keVBvcyA9IC0xO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICAjYm9hcmRTaXplID0gMTA7XG5cbiAgICAjcGxhY2VPcmRlciA9IDA7XG5cbiAgICBib2FyZDogU3RhdGVbXVtdID0gW107XG4gICAgc2hpcHM6IFNoaXBbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykgdGhpcy5ib2FyZFtpXS5wdXNoKG5ldyBTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMikpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMykpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMykpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoNCkpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoNSkpO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50U2hpcFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBzW3RoaXMuI3BsYWNlT3JkZXJdLnNpemU7XG4gICAgfVxuXG4gICAgI2dldEZhY3Rvcihpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHJvd0ZhY3RvciA9IGlzVmVydGljYWwgPyAxIDogMDtcbiAgICAgICAgY29uc3QgY29sRmFjdG9yID0gaXNWZXJ0aWNhbCA/IDAgOiAxO1xuICAgICAgICByZXR1cm4gW3Jvd0ZhY3RvciwgY29sRmFjdG9yXTtcbiAgICB9XG5cbiAgICAjaXNPdXRPZkJvYXJkKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgaXNWZXJ0aWNhbDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBbcm93RmFjdG9yLCBjb2xGYWN0b3JdID0gdGhpcy4jZ2V0RmFjdG9yKGlzVmVydGljYWwpO1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLiNwbGFjZU9yZGVyXS5ib2R5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAocm93ICsgaSAqIHJvd0ZhY3RvciA+PSB0aGlzLiNib2FyZFNpemUgfHwgY29sICsgaSAqIGNvbEZhY3RvciA+PSB0aGlzLiNib2FyZFNpemUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAjaXNFbXB0eShyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIGlzVmVydGljYWw6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgW3Jvd0ZhY3RvciwgY29sRmFjdG9yXSA9IHRoaXMuI2dldEZhY3Rvcihpc1ZlcnRpY2FsKTtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHRoaXMuc2hpcHNbdGhpcy4jcGxhY2VPcmRlcl0uYm9keS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSBpZiAodGhpcy5ib2FyZFtyb3cgKyBpICogcm93RmFjdG9yXVtjb2wgKyBpICogY29sRmFjdG9yXS5pc1NoaXApIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLiNwbGFjZU9yZGVyID0gMDtcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4gc2hpcC5pbml0KCkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuI2JvYXJkU2l6ZTsgaSsrKSB0aGlzLmJvYXJkW2ldLmZvckVhY2godmFsdWUgPT4gdmFsdWUuaW5pdCgpKTtcbiAgICB9XG5cbiAgICBpc0FsbFNoaXBzUGxhY2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGxhY2VPcmRlciA+PSA1O1xuICAgIH1cblxuICAgIGlzVmFsaWRQb3Mocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy4jaXNPdXRPZkJvYXJkKHJvdywgY29sLCBpc1ZlcnRpY2FsKSAmJiB0aGlzLiNpc0VtcHR5KHJvdywgY29sLCBpc1ZlcnRpY2FsKTtcbiAgICB9XG5cbiAgICBwbGFjZVNoaXAocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBpc1ZlcnRpY2FsOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gdGhpcy5zaGlwc1t0aGlzLiNwbGFjZU9yZGVyXS5ib2R5Lmxlbmd0aDtcbiAgICAgICAgY29uc3QgW3Jvd0ZhY3RvciwgY29sRmFjdG9yXSA9IHRoaXMuI2dldEZhY3Rvcihpc1ZlcnRpY2FsKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaSAqIHJvd0ZhY3Rvcl1bY29sICsgaSAqIGNvbEZhY3Rvcl0uaXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaSAqIHJvd0ZhY3Rvcl1bY29sICsgaSAqIGNvbEZhY3Rvcl0uc2hpcE9yZGVyID0gdGhpcy4jcGxhY2VPcmRlcjtcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaSAqIHJvd0ZhY3Rvcl1bY29sICsgaSAqIGNvbEZhY3Rvcl0uc2hpcEJvZHlQb3MgPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4jcGxhY2VPcmRlciArPSAxO1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2socm93OiBudW1iZXIsIGNvbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdLmlzSGl0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2xdLmlzU2hpcCkge1xuICAgICAgICAgICAgY29uc3Qgc2hpcE9yZGVyID0gdGhpcy5ib2FyZFtyb3ddW2NvbF0uc2hpcE9yZGVyO1xuICAgICAgICAgICAgY29uc3Qgc2hpcEJvZHlQb3MgPSB0aGlzLmJvYXJkW3Jvd11bY29sXS5zaGlwQm9keVBvcztcbiAgICAgICAgICAgIHRoaXMuc2hpcHNbc2hpcE9yZGVyXS5ib2R5W3NoaXBCb2R5UG9zXSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIGlmICghdGhpcy5zaGlwc1tpXS5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBnYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmdhbWVib2FyZC5pbml0KCk7XG4gICAgfVxuXG4gICAgYXR0YWNrKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgb3Bwb25lbnQ6IFBsYXllcikge1xuICAgICAgICByZXR1cm4gb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xuICAgIH1cblxuICAgIGlzVmFsaWRQb3NUb0F0dGFjayhyb3c6IG51bWJlciwgY29sOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNIaXQ7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0aW9uKG9wcG9uZW50OiBQbGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgb3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50LmdhbWVib2FyZC5ib2FyZDtcbiAgICAgICAgY29uc3QgYm9hcmRTaXplID0gMTA7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJvYXJkU2l6ZTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJvYXJkU2l6ZTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9wcG9uZW50Qm9hcmRbcm93XVtjb2xdLmlzSGl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGJvZHk6IGJvb2xlYW5bXSA9IFtdO1xuICAgIHNpemU6IG51bWJlclxuXG4gICAgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zaXplID0gbGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB0aGlzLmJvZHkucHVzaCh0cnVlKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmJvZHkuZmlsbCh0cnVlKTtcbiAgICB9XG5cbiAgICBoaXQocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICBpZiAoISF0aGlzLmJvZHkuYXQocG9zaXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlbcG9zaXRpb25dID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNTdW5rKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuYm9keS5pbmNsdWRlcyh0cnVlKTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdlbmVyYXRlQm9hcmQsIHJlbmRlclNoaXBPbkJvYXJkLCByZW5kZXJTaG9vdE9uQm9hcmQgfSBmcm9tICcuL0RPTS9yZW5kZXJlcic7XG5pbXBvcnQgeyBnZXRSb3dDb2xGcm9tRGF0YXNldCwgaXNHYW1lT3ZlciB9IGZyb20gJy4vRE9NL3V0aWxzJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9tb2R1bGVzL3BsYXllcic7XG5cbmNvbnN0IGJvYXJkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZDEnKTtcbmNvbnN0IGJvYXJkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZDInKTtcbmNvbnN0IHBsYXllcjEgPSBuZXcgUGxheWVyKCk7XG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcigpO1xuXG5sZXQgd2hvc2VUdXJuID0gMTtcblxuYm9hcmQxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGdldFJvd0NvbEZyb21EYXRhc2V0KHRhcmdldC5kYXRhc2V0KTtcbiAgICAgICAgaWYgKCFwbGF5ZXIxLmdhbWVib2FyZC5pc0FsbFNoaXBzUGxhY2VkKCkgJiYgcGxheWVyMS5nYW1lYm9hcmQuaXNWYWxpZFBvcyhyb3csIGNvbCwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBJbmZvID0geyBzaXplOiBwbGF5ZXIxLmdhbWVib2FyZC5jdXJyZW50U2hpcFNpemUsIGlzVmVydGljYWw6IHRydWUgfTtcbiAgICAgICAgICAgIHJlbmRlclNoaXBPbkJvYXJkKHJvdywgY29sLCBzaGlwSW5mbywgYm9hcmQxKTtcbiAgICAgICAgICAgIHBsYXllcjEuZ2FtZWJvYXJkLnBsYWNlU2hpcChyb3csIGNvbCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmUgaXMgbm8gc2hpcCBvciB0aGUgcG9zaXRpb24gaXMgaW52YWxpZCcpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmJvYXJkMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAvLyBpZiB0aGUgc2hpcHMgaGF2ZW4ndCBiZWVuIHBsYWNlZCB8fCB0aGUgZ2FtZSBpcyBvdmVyXG4gICAgaWYgKCFwbGF5ZXIxLmdhbWVib2FyZC5pc0FsbFNoaXBzUGxhY2VkKCkgfHwgaXNHYW1lT3ZlcihwbGF5ZXIxLCBwbGF5ZXIyKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gZ2V0Um93Q29sRnJvbURhdGFzZXQodGFyZ2V0LmRhdGFzZXQpO1xuICAgICAgICAvKipcbiAgICAgICAgICogaWYgdGhlIHBvc2l0aW9uIGlzIHZhbGlkXG4gICAgICAgICAqICAgYXR0YWNrIHRoZSBwb3NpdGlvblxuICAgICAgICAgKiAgIGlmIHBsYXllcjIgaXMgYWxpdmVcbiAgICAgICAgICogICAgIHBsYXllcjIgYXR0YWNrXG4gICAgICAgICAqL1xuICAgICAgICBpZiAocGxheWVyMi5pc1ZhbGlkUG9zVG9BdHRhY2socm93LCBjb2wpKSB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIxQXR0YWNrUmVzdWx0ID0gcGxheWVyMS5hdHRhY2socm93LCBjb2wsIHBsYXllcjIpO1xuICAgICAgICAgICAgcmVuZGVyU2hvb3RPbkJvYXJkKHJvdywgY29sLCBwbGF5ZXIxQXR0YWNrUmVzdWx0LCBib2FyZDIpO1xuICAgICAgICAgICAgaWYocGxheWVyMi5nYW1lYm9hcmQuaXNBbGxTaGlwc1N1bmsoKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgW2F0dGFja1JvdywgYXR0YWNrQ29sXSA9IHBsYXllcjIuZ2V0U2VsZWN0aW9uKHBsYXllcjEpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyMkF0dGFja1Jlc3VsdCA9IHBsYXllcjIuYXR0YWNrKGF0dGFja1JvdywgYXR0YWNrQ29sLCBwbGF5ZXIxKTtcbiAgICAgICAgICAgIHJlbmRlclNob290T25Cb2FyZChhdHRhY2tSb3csIGF0dGFja0NvbCwgcGxheWVyMkF0dGFja1Jlc3VsdCwgYm9hcmQxKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICBwbGF5ZXIxLmluaXQoKTtcbiAgICBwbGF5ZXIyLmluaXQoKTtcbn0pO1xuXG5nZW5lcmF0ZUJvYXJkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZCcpKTtcblxucmVuZGVyU2hpcE9uQm9hcmQoMCwgMCwgeyBzaXplOiAyLCBpc1ZlcnRpY2FsOiB0cnVlIH0sIGJvYXJkMik7XG5yZW5kZXJTaGlwT25Cb2FyZCgwLCAxLCB7IHNpemU6IDMsIGlzVmVydGljYWw6IHRydWUgfSwgYm9hcmQyKTtcbnJlbmRlclNoaXBPbkJvYXJkKDAsIDIsIHsgc2l6ZTogMywgaXNWZXJ0aWNhbDogdHJ1ZSB9LCBib2FyZDIpO1xucmVuZGVyU2hpcE9uQm9hcmQoMCwgMywgeyBzaXplOiA0LCBpc1ZlcnRpY2FsOiB0cnVlIH0sIGJvYXJkMik7XG5yZW5kZXJTaGlwT25Cb2FyZCgwLCA0LCB7IHNpemU6IDUsIGlzVmVydGljYWw6IHRydWUgfSwgYm9hcmQyKTtcbnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCAwLCB0cnVlKTtcbnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCAxLCB0cnVlKTtcbnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCAyLCB0cnVlKTtcbnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCAzLCB0cnVlKTtcbnBsYXllcjIuZ2FtZWJvYXJkLnBsYWNlU2hpcCgwLCA0LCB0cnVlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==