/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*************************************!*\
  !*** ./src/js/modules/gameboard.ts ***!
  \*************************************/
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
var _Gameboard_boardSize;

class State {
    constructor(isHit = false, isShip = false, shipOrder = -1, shipBodyPos = -1) {
        this.isHit = isHit;
        this.isShip = isShip;
        this.shipOrder = shipOrder;
        this.shipBodyPos = shipBodyPos;
    }
}
class Gameboard {
    constructor() {
        _Gameboard_boardSize.set(this, 10);
        this.placeOrder = 0;
        this.board = [];
        this.ships = [];
        for (let i = 0; i < 10; i++) {
            this.board.push([]);
            for (let j = 0; j < 10; j++)
                this.board[i].push(new State());
        }
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4));
        this.ships.push(new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](5));
    }
    _getFactor(isVertical) {
        const xFactor = isVertical ? 0 : 1;
        const yFactor = isVertical ? 1 : 0;
        return [xFactor, yFactor];
    }
    _isOutOfBoard(x, y, isVertical, shipLength) {
        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++)
            if (x + i * xFactor >= __classPrivateFieldGet(this, _Gameboard_boardSize, "f") || y + i * yFactor >= __classPrivateFieldGet(this, _Gameboard_boardSize, "f"))
                return true;
        return false;
    }
    _isEmpty(x, y, isVertical, shipLength) {
        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++)
            if (this.board[x + i * xFactor][y + i * yFactor].isShip)
                return false;
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
        if (this.placeOrder >= this.ships.length)
            return false;
        const x = coordinate.x;
        const y = coordinate.y;
        const shipLength = this.ships[this.placeOrder].body.length;
        if (!this._isValidPos(x, y, isVertical, shipLength))
            return false;
        const [xFactor, yFactor] = this._getFactor(isVertical);
        for (let i = 0; i < shipLength; i++) {
            this.board[x + i * xFactor][y + i * yFactor].isShip = true;
            this.board[x + i * xFactor][y + i * yFactor].shipOrder = this.placeOrder;
            this.board[x + i * xFactor][y + i * yFactor].shipBodyPos = i;
        }
        this.placeOrder += 1;
        return true;
    }
}
_Gameboard_boardSize = new WeakMap();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQSw4QkFBOEIsU0FBSSxJQUFJLFNBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0EsNEJBQTRCLDZDQUFJLFNBQVMsNkNBQUk7QUFDN0MsNEJBQTRCLDZDQUFJLFNBQVMsNkNBQUk7QUFDN0MsNEJBQTRCLDZDQUFJLFNBQVMsNkNBQUk7QUFDN0MsNEJBQTRCLDZDQUFJLFNBQVMsNkNBQUk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QyxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9zaGlwLnRzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9nYW1lYm9hcmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYm9keSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdGhpcy5ib2R5LnB1c2godHJ1ZSk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYm9keS5maWxsKHRydWUpO1xuICAgIH1cbiAgICBoaXQocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCEhdGhpcy5ib2R5LmF0KHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5W3Bvc2l0aW9uXSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpc1N1bmsoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5ib2R5LmluY2x1ZGVzKHRydWUpO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fY2xhc3NQcml2YXRlRmllbGRHZXQgPSAodGhpcyAmJiB0aGlzLl9fY2xhc3NQcml2YXRlRmllbGRHZXQpIHx8IGZ1bmN0aW9uIChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn07XG52YXIgX0dhbWVib2FyZF9ib2FyZFNpemU7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuY2xhc3MgU3RhdGUge1xuICAgIGNvbnN0cnVjdG9yKGlzSGl0ID0gZmFsc2UsIGlzU2hpcCA9IGZhbHNlLCBzaGlwT3JkZXIgPSAtMSwgc2hpcEJvZHlQb3MgPSAtMSkge1xuICAgICAgICB0aGlzLmlzSGl0ID0gaXNIaXQ7XG4gICAgICAgIHRoaXMuaXNTaGlwID0gaXNTaGlwO1xuICAgICAgICB0aGlzLnNoaXBPcmRlciA9IHNoaXBPcmRlcjtcbiAgICAgICAgdGhpcy5zaGlwQm9keVBvcyA9IHNoaXBCb2R5UG9zO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9HYW1lYm9hcmRfYm9hcmRTaXplLnNldCh0aGlzLCAxMCk7XG4gICAgICAgIHRoaXMucGxhY2VPcmRlciA9IDA7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXS5wdXNoKG5ldyBTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoMiksIG5ldyBTaGlwKDIpKTtcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ldyBTaGlwKDMpLCBuZXcgU2hpcCgzKSk7XG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXcgU2hpcCg0KSwgbmV3IFNoaXAoNCkpO1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3IFNoaXAoNSksIG5ldyBTaGlwKDUpKTtcbiAgICB9XG4gICAgX2dldEZhY3Rvcihpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGNvbnN0IHhGYWN0b3IgPSBpc1ZlcnRpY2FsID8gMCA6IDE7XG4gICAgICAgIGNvbnN0IHlGYWN0b3IgPSBpc1ZlcnRpY2FsID8gMSA6IDA7XG4gICAgICAgIHJldHVybiBbeEZhY3RvciwgeUZhY3Rvcl07XG4gICAgfVxuICAgIF9pc091dE9mQm9hcmQoeCwgeSwgaXNWZXJ0aWNhbCwgc2hpcExlbmd0aCkge1xuICAgICAgICBjb25zdCBbeEZhY3RvciwgeUZhY3Rvcl0gPSB0aGlzLl9nZXRGYWN0b3IoaXNWZXJ0aWNhbCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYgKHggKyBpICogeEZhY3RvciA+PSBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHRoaXMsIF9HYW1lYm9hcmRfYm9hcmRTaXplLCBcImZcIikgfHwgeSArIGkgKiB5RmFjdG9yID49IF9fY2xhc3NQcml2YXRlRmllbGRHZXQodGhpcywgX0dhbWVib2FyZF9ib2FyZFNpemUsIFwiZlwiKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaXNFbXB0eSh4LCB5LCBpc1ZlcnRpY2FsLCBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IFt4RmFjdG9yLCB5RmFjdG9yXSA9IHRoaXMuX2dldEZhY3Rvcihpc1ZlcnRpY2FsKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAodGhpcy5ib2FyZFt4ICsgaSAqIHhGYWN0b3JdW3kgKyBpICogeUZhY3Rvcl0uaXNTaGlwKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9pc1ZhbGlkUG9zKHgsIHksIGlzVmVydGljYWwsIHNoaXBMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9pc091dE9mQm9hcmQoeCwgeSwgaXNWZXJ0aWNhbCwgc2hpcExlbmd0aCkgJiYgdGhpcy5faXNFbXB0eSh4LCB5LCBpc1ZlcnRpY2FsLCBzaGlwTGVuZ3RoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7eDogbnVtYmVyLCB5Om51bWJlcn19IGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmVydGljYWxcbiAgICAgKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBzaGlwIGlzIHBsYWNlZCBjb3JyZWN0bHlcbiAgICAgKi9cbiAgICBwbGFjZVNoaXAoY29vcmRpbmF0ZSwgaXNWZXJ0aWNhbCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMucGxhY2VPcmRlciA+PSB0aGlzLnNoaXBzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgeCA9IGNvb3JkaW5hdGUueDtcbiAgICAgICAgY29uc3QgeSA9IGNvb3JkaW5hdGUueTtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IHRoaXMuc2hpcHNbdGhpcy5wbGFjZU9yZGVyXS5ib2R5Lmxlbmd0aDtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1ZhbGlkUG9zKHgsIHksIGlzVmVydGljYWwsIHNoaXBMZW5ndGgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBbeEZhY3RvciwgeUZhY3Rvcl0gPSB0aGlzLl9nZXRGYWN0b3IoaXNWZXJ0aWNhbCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpICogeEZhY3Rvcl1beSArIGkgKiB5RmFjdG9yXS5pc1NoaXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaSAqIHhGYWN0b3JdW3kgKyBpICogeUZhY3Rvcl0uc2hpcE9yZGVyID0gdGhpcy5wbGFjZU9yZGVyO1xuICAgICAgICAgICAgdGhpcy5ib2FyZFt4ICsgaSAqIHhGYWN0b3JdW3kgKyBpICogeUZhY3Rvcl0uc2hpcEJvZHlQb3MgPSBpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxhY2VPcmRlciArPSAxO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5fR2FtZWJvYXJkX2JvYXJkU2l6ZSA9IG5ldyBXZWFrTWFwKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=