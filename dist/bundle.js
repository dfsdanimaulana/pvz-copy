/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/cell.ts":
/*!*****************************!*\
  !*** ./src/classes/cell.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constant_1 = __webpack_require__(/*! ../constant */ "./src/constant.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constant_1.CELL_SIZE;
        this.height = constant_1.CELL_SIZE;
        this.color = 'black';
    }
    draw(ctx, mouse) {
        if (mouse.x && mouse.y && (0, utils_1.collisionDetection)(this, mouse)) {
            this.color = 'red';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}
exports["default"] = Cell;


/***/ }),

/***/ "./src/classes/defender.ts":
/*!*********************************!*\
  !*** ./src/classes/defender.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constant_1 = __webpack_require__(/*! ../constant */ "./src/constant.ts");
const projectile_1 = __importDefault(__webpack_require__(/*! ./projectile */ "./src/classes/projectile.ts"));
class Defender {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constant_1.CELL_SIZE;
        this.height = constant_1.CELL_SIZE;
        this.timer = 0;
        this.health = 100;
        this.color = 'blue';
        this.healthColor = 'gold';
        this.shooting = false;
    }
    update(projectiles) {
        if (this.shooting) {
            this.timer++;
            if (this.timer % 100 === 0) {
                projectiles.push(new projectile_1.default(this.x + this.width, this.y + this.height / 2));
            }
        }
        else {
            this.timer = 0;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.healthColor;
        ctx.font = '20px Creepster';
        ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20);
    }
}
exports["default"] = Defender;


/***/ }),

/***/ "./src/classes/enemy.ts":
/*!******************************!*\
  !*** ./src/classes/enemy.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constant_1 = __webpack_require__(/*! ../constant */ "./src/constant.ts");
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constant_1.CELL_SIZE;
        this.height = constant_1.CELL_SIZE;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.color = 'red';
        this.health = 100;
        this.healthColor = 'gold';
        this.maxHealth = this.health;
        this.damage = 0.2;
    }
    update() {
        this.x -= this.movement;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.healthColor;
        ctx.font = '20px Creepster';
        ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20);
    }
}
exports["default"] = Enemy;


/***/ }),

/***/ "./src/classes/floatingMessage.ts":
/*!****************************************!*\
  !*** ./src/classes/floatingMessage.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class FloatingMessage {
    constructor(value, x, y, size, color) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.lifespan = 0;
        this.opacity = 1;
    }
    update() {
        this.y -= 0.3;
        this.lifespan += 1;
        if (this.opacity > 0.01) {
            this.opacity -= 0.01;
        }
    }
    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px Creepster`;
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}
exports["default"] = FloatingMessage;


/***/ }),

/***/ "./src/classes/mouse.ts":
/*!******************************!*\
  !*** ./src/classes/mouse.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Mouse {
    constructor() {
        this.x = undefined;
        this.y = undefined;
        this.width = 0.1;
        this.height = 0.1;
    }
}
exports["default"] = Mouse;


/***/ }),

/***/ "./src/classes/projectile.ts":
/*!***********************************!*\
  !*** ./src/classes/projectile.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
        this.color = 'green';
    }
    update() {
        this.x += this.speed;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
}
exports["default"] = Projectile;


/***/ }),

/***/ "./src/classes/resource.ts":
/*!*********************************!*\
  !*** ./src/classes/resource.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constant_1 = __webpack_require__(/*! ../constant */ "./src/constant.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
class Resource {
    constructor(canvasWidth) {
        this.canvasWidth = canvasWidth;
        this.color = 'yellow';
        this.width = constant_1.CELL_SIZE * 0.6;
        this.height = constant_1.CELL_SIZE * 0.6;
        this.amounts = [30, 40, 50];
        this.amount = (0, utils_1.getRandomValueFromArray)(this.amounts);
        this.x = Math.random() * (this.canvasWidth - constant_1.CELL_SIZE);
        this.y = Math.floor(Math.random() * 5 + 1) * constant_1.CELL_SIZE + 25;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Creepster';
        ctx.fillText(this.amount.toString(), this.x + 15, this.y + 25);
    }
}
exports["default"] = Resource;


/***/ }),

/***/ "./src/constant.ts":
/*!*************************!*\
  !*** ./src/constant.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CELL_SIZE = void 0;
exports.CELL_SIZE = 100;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const constant_1 = __webpack_require__(/*! ./constant */ "./src/constant.ts");
const cell_1 = __importDefault(__webpack_require__(/*! ./classes/cell */ "./src/classes/cell.ts"));
const mouse_1 = __importDefault(__webpack_require__(/*! ./classes/mouse */ "./src/classes/mouse.ts"));
const defender_1 = __importDefault(__webpack_require__(/*! ./classes/defender */ "./src/classes/defender.ts"));
const enemy_1 = __importDefault(__webpack_require__(/*! ./classes/enemy */ "./src/classes/enemy.ts"));
const resource_1 = __importDefault(__webpack_require__(/*! ./classes/resource */ "./src/classes/resource.ts"));
const floatingMessage_1 = __importDefault(__webpack_require__(/*! ./classes/floatingMessage */ "./src/classes/floatingMessage.ts"));
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;
    // global variables
    let wave = 0;
    let frame = 0;
    let score = 0;
    let enemiesInterval = 600;
    let numberOfResources = 300;
    let gameOver = false;
    const cellSize = constant_1.CELL_SIZE;
    const winningScore = 50;
    const gameGrid = [];
    const defenders = [];
    const enemies = [];
    const enemyPositions = [];
    const projectiles = [];
    const resources = [];
    const floatingMessages = [];
    const mouse = new mouse_1.default();
    let canvasPosition = canvas.getBoundingClientRect();
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.x - canvasPosition.left;
        mouse.y = e.y - canvasPosition.top;
    });
    canvas.addEventListener('mouseleave', function (e) {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    // game board
    const controlsBar = {
        width: canvas.width,
        height: cellSize,
    };
    function createGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            gameGrid.push([]);
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i].push(new cell_1.default(i * cellSize, j * cellSize));
            }
        }
    }
    createGameGrid();
    function handleGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i][j].draw(ctx, mouse);
            }
        }
    }
    function handleProjectiles() {
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update();
            projectiles[i].draw(ctx);
            // handle collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (projectiles[i] && enemies[j] && (0, utils_1.collisionDetection)(projectiles[i], enemies[j])) {
                    enemies[j].health -= projectiles[i].power;
                    projectiles.splice(i, 1);
                    i--;
                }
            }
            if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
                projectiles.splice(i, 1);
                i--;
            }
        }
    }
    // defenders
    canvas.addEventListener('click', function () {
        if (!mouse.x || !mouse.y)
            return;
        const gridPositionX = mouse.x - (mouse.x % cellSize);
        const gridPositionY = mouse.y - (mouse.y % cellSize);
        if (gridPositionY < cellSize)
            return;
        // prevent multiple Defender on the same position
        for (let i = 0; i < defenders.length; i++) {
            if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY)
                return;
        }
        let defenderCost = 100;
        if (numberOfResources >= defenderCost) {
            defenders.push(new defender_1.default(gridPositionX, gridPositionY));
            numberOfResources -= defenderCost;
        }
        else {
            floatingMessages.push(new floatingMessage_1.default('Not enough resources', mouse.x, mouse.y, 20, 'red'));
        }
    });
    function handleDefenders() {
        for (let i = 0; i < defenders.length; i++) {
            defenders[i].draw(ctx);
            defenders[i].update(projectiles);
            // set shooting to true when enemies are in same y position
            if (enemyPositions.indexOf(defenders[i].y) !== -1) {
                defenders[i].shooting = true;
            }
            else {
                defenders[i].shooting = false;
            }
            // check collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (defenders[i] && (0, utils_1.collisionDetection)(defenders[i], enemies[j])) {
                    enemies[j].movement = 0;
                    defenders[i].health -= enemies[j].damage;
                }
                // remove defender when health is 0
                if (defenders[i] && defenders[i].health <= 0) {
                    defenders.splice(i, 1);
                    i--;
                    enemies[j].movement = enemies[j].speed;
                }
            }
        }
    }
    function handleFloatingMessages() {
        for (let i = 0; i < floatingMessages.length; i++) {
            floatingMessages[i].update();
            floatingMessages[i].draw(ctx);
            if (floatingMessages[i].lifespan > 50) {
                floatingMessages.splice(i, 1);
                i--;
            }
        }
        console.log(floatingMessages);
    }
    // Enemies
    function handleEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw(ctx);
            enemies[i].update();
            // handle game over
            if (enemies[i].x < 0) {
                gameOver = true;
            }
            if (enemies[i].health <= 0) {
                let gainedResources = enemies[i].maxHealth / 10;
                floatingMessages.push(new floatingMessage_1.default('+' + gainedResources, enemies[i].x, enemies[i].y, 30, 'black'), new floatingMessage_1.default('+' + gainedResources, cellSize, cellSize / 4, 30, 'black'));
                numberOfResources += gainedResources;
                score += gainedResources;
                const findThisIndex = enemyPositions.indexOf(enemies[i].y);
                enemyPositions.splice(findThisIndex, 1);
                enemies.splice(i, 1);
                i--;
            }
        }
        if (frame % enemiesInterval === 0 && score < winningScore) {
            let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize;
            enemies.push(new enemy_1.default(canvas.width, verticalPosition));
            enemyPositions.push(verticalPosition);
            if (enemiesInterval > 120) {
                enemiesInterval -= 100;
            }
        }
    }
    // resources
    function handleResources() {
        if (frame % 500 === 0 && score < winningScore) {
            resources.push(new resource_1.default(canvas.width));
        }
        for (let i = 0; i < resources.length; i++) {
            resources[i].draw(ctx);
            // check collision between resource and mouse
            if (resources[i] && mouse.x && mouse.y && (0, utils_1.collisionDetection)(resources[i], mouse)) {
                numberOfResources += resources[i].amount;
                floatingMessages.push(new floatingMessage_1.default('+' + resources[i].amount, resources[i].x, resources[i].y, 30, 'green'));
                floatingMessages.push(new floatingMessage_1.default('+' + resources[i].amount, cellSize, cellSize / 3, 20, 'green'));
                resources.splice(i, 1);
                i--;
            }
        }
    }
    // utilities
    function handleGameStatus() {
        ctx.fillStyle = 'gold';
        ctx.font = '20px Creepster';
        ctx.fillText('Score: ' + score, 10, 20);
        ctx.fillText('Resources: ' + numberOfResources, 10, 40);
        if (gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '90px Creepster';
            ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2);
        }
        if (score >= winningScore && enemies.length === 0) {
            ctx.fillStyle = 'black';
            ctx.font = '60px Creepster';
            ctx.fillText('You Win!', canvas.width / 2 - 50, canvas.height / 2);
            ctx.font = '20px Creepster';
            ctx.fillText('Your score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 50);
        }
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
        handleGameGrid();
        handleDefenders();
        handleProjectiles();
        handleEnemies();
        handleResources();
        handleGameStatus();
        handleFloatingMessages();
        frame++;
        if (!gameOver)
            requestAnimationFrame(animate);
    }
    animate();
    // add listener for screen resize
    window.addEventListener('resize', function () {
        canvasPosition = canvas.getBoundingClientRect();
    });
};


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRandomValueFromArray = exports.collisionDetection = void 0;
// collision detection
function collisionDetection(first, second) {
    return (first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y);
}
exports.collisionDetection = collisionDetection;
function getRandomValueFromArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Parameter must be an array');
    }
    if (arr.length === 0) {
        throw new Error('Array must not be empty');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
exports.getRandomValueFromArray = getRandomValueFromArray;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map