/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/game.ts":
/*!*****************************!*\
  !*** ./src/classes/game.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Game {
    constructor() {
        console.log('From class Game');
    }
}
exports["default"] = Game;


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
const game_1 = __importDefault(__webpack_require__(/*! ./classes/game */ "./src/classes/game.ts"));
window.onload = function () {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    canvas.width = 900;
    canvas.height = 600;
    const game = new game_1.default();
    // global variables
    const cellSize = 100;
    const gameGrid = [];
    const defenders = [];
    const enemies = [];
    const enemyPositions = [];
    const projectiles = [];
    const resources = [];
    const winningScore = 50;
    let enemiesInterval = 600;
    let numberOfResources = 300;
    let gameOver = false;
    let wave = 0;
    let frame = 0;
    let score = 0;
    const mouse = {
        x: undefined,
        y: undefined,
        width: 0.1,
        height: 0.1,
    };
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
    class Cell {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
            this.color = 'black';
        }
        draw() {
            if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
                this.color = 'red';
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
        }
    }
    function createGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            gameGrid.push([]);
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i].push(new Cell(i * cellSize, j * cellSize));
            }
        }
    }
    createGameGrid();
    function handleGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i][j].draw();
            }
        }
    }
    // projectiles
    class Projectile {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 10;
            this.color = 'black';
            this.power = 20;
            this.speed = 5;
        }
        update() {
            this.x += this.speed;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function handleProjectiles() {
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update();
            projectiles[i].draw();
            // handle collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (projectiles[i] && enemies[j] && collisionDetection(projectiles[i], enemies[j])) {
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
    class Defender {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
            this.color = 'blue';
            this.shooting = false;
            this.health = 100;
            this.projectiles = [];
            this.timer = 0;
        }
        update() {
            if (this.shooting) {
                this.timer++;
                if (this.timer % 100 === 0) {
                    projectiles.push(new Projectile(this.x + this.width, this.y + this.height / 2));
                }
            }
            else {
                this.timer = 0;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '20px Creepster';
            ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20);
        }
    }
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
            defenders.push(new Defender(gridPositionX, gridPositionY));
            numberOfResources -= defenderCost;
        }
    });
    function handleDefenders() {
        for (let i = 0; i < defenders.length; i++) {
            defenders[i].draw();
            defenders[i].update();
            // set shooting to true when enemies are in same y position
            if (enemyPositions.indexOf(defenders[i].y) !== -1) {
                defenders[i].shooting = true;
            }
            else {
                defenders[i].shooting = false;
            }
            // check collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (defenders[i] && collisionDetection(defenders[i], enemies[j])) {
                    enemies[j].movement = 0;
                    defenders[i].health -= 0.2;
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
    // Enemies
    class Enemy {
        constructor(verticalPosition) {
            this.x = canvas.width;
            this.y = verticalPosition;
            this.width = cellSize;
            this.height = cellSize;
            this.color = 'red';
            this.speed = Math.random() * 0.2 + 0.4;
            this.movement = this.speed;
            this.health = 100;
            this.maxHealth = this.health;
        }
        update() {
            this.x -= this.movement;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'gold';
            ctx.font = '20px Creepster';
            ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20);
        }
    }
    function handleEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw();
            enemies[i].update();
            // handle game over
            if (enemies[i].x < 0) {
                gameOver = true;
            }
            if (enemies[i].health <= 0) {
                let gainedResources = enemies[i].maxHealth / 10;
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
            enemies.push(new Enemy(verticalPosition));
            enemyPositions.push(verticalPosition);
            if (enemiesInterval > 120) {
                enemiesInterval -= 100;
            }
        }
    }
    // resources
    const amounts = [20, 30, 40];
    class Resource {
        constructor() {
            this.x = Math.random() * (canvas.width - cellSize);
            this.y = Math.floor(Math.random() * 5 + 1) * cellSize + 25;
            this.color = 'yellow';
            this.width = cellSize * 0.6;
            this.height = cellSize * 0.6;
            this.amount = amounts[Math.floor(Math.random() * amounts.length)];
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'black';
            ctx.font = '20px Creepster';
            ctx.fillText(this.amount.toString(), this.x + 15, this.y + 25);
        }
    }
    function handleResources() {
        if (frame % 500 === 0 && score < winningScore) {
            resources.push(new Resource());
        }
        for (let i = 0; i < resources.length; i++) {
            resources[i].draw();
            // check collision between resource and mouse
            if (resources[i] && mouse.x && mouse.y && collisionDetection(resources[i], mouse)) {
                numberOfResources += resources[i].amount;
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
        frame++;
        if (!gameOver)
            requestAnimationFrame(animate);
    }
    animate();
    // collision detection
    function collisionDetection(first, second) {
        return (first.x < second.x + second.width &&
            first.x + first.width > second.x &&
            first.y < second.y + second.height &&
            first.y + first.height > second.y);
    }
    // add listener for screen resize
    window.addEventListener('resize', function () {
        canvasPosition = canvas.getBoundingClientRect();
    });
};


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