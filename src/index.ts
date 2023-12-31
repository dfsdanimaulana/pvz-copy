import { collisionDetection } from './utils'
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from './constant'
import Cell from './classes/cell'
import Mouse from './classes/mouse'
import Projectile from './classes/projectile'
import Defender from './classes/defender'
import Enemy from './classes/enemy'
import Resource from './classes/resource'
import FloatingMessage from './classes/floatingMessage'

window.onload = function () {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    // global variables
    let wave = 0
    let frame = 0
    let score = 0
    let enemiesInterval = 600
    let numberOfResources = 300
    let gameOver = false

    const cellSize = CELL_SIZE
    const winningScore = 50
    const gameGrid: Cell[][] = []
    const defenders: Defender[] = []
    const enemies: Enemy[] = []
    const enemyPositions: number[] = []
    const projectiles: Projectile[] = []
    const resources: Resource[] = []
    const floatingMessages: FloatingMessage[] = []

    const mouse = new Mouse()

    let canvasPosition = canvas.getBoundingClientRect()

    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.x - canvasPosition.left
        mouse.y = e.y - canvasPosition.top
    })
    canvas.addEventListener('mouseleave', function (e) {
        mouse.x = undefined
        mouse.y = undefined
    })

    // game board
    const controlsBar = {
        width: canvas.width,
        height: cellSize,
    }

    function createGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            gameGrid.push([])
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i].push(new Cell(i * cellSize, j * cellSize))
            }
        }
    }

    createGameGrid()

    function handleGameGrid() {
        for (let i = 0; i < canvas.width / cellSize; i++) {
            for (let j = 0; j < canvas.height / cellSize; j++) {
                gameGrid[i][j].draw(ctx, mouse)
            }
        }
    }

    function handleProjectiles() {
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update()
            projectiles[i].draw(ctx)

            // handle collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (projectiles[i] && enemies[j] && collisionDetection(projectiles[i], enemies[j])) {
                    enemies[j].health -= projectiles[i].power
                    projectiles.splice(i, 1)
                    i--
                }
            }

            if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
                projectiles.splice(i, 1)
                i--
            }
        }
    }

    // defenders

    canvas.addEventListener('click', function () {
        if (!mouse.x || !mouse.y) return
        const gridPositionX = mouse.x - (mouse.x % cellSize)
        const gridPositionY = mouse.y - (mouse.y % cellSize)
        if (gridPositionY < cellSize) return

        // prevent multiple Defender on the same position
        for (let i = 0; i < defenders.length; i++) {
            if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return
        }

        let defenderCost = 100
        if (numberOfResources >= defenderCost) {
            defenders.push(new Defender(gridPositionX, gridPositionY))
            numberOfResources -= defenderCost
        } else {
            floatingMessages.push(new FloatingMessage('Not enough resources', mouse.x, mouse.y, 20, 'red'))
        }
    })

    function handleDefenders() {
        for (let i = 0; i < defenders.length; i++) {
            defenders[i].draw(ctx)
            defenders[i].update(projectiles)

            // set shooting to true when enemies are in same y position
            if (enemyPositions.indexOf(defenders[i].y) !== -1) {
                defenders[i].shooting = true
            } else {
                defenders[i].shooting = false
            }

            // check collision with enemies
            for (let j = 0; j < enemies.length; j++) {
                if (defenders[i] && collisionDetection(defenders[i], enemies[j])) {
                    enemies[j].movement = 0
                    defenders[i].health -= enemies[j].damage
                }

                // remove defender when health is 0
                if (defenders[i] && defenders[i].health <= 0) {
                    defenders.splice(i, 1)
                    i--
                    enemies[j].movement = enemies[j].speed
                }
            }
        }
    }

    function handleFloatingMessages() {
        for (let i = 0; i < floatingMessages.length; i++) {
            floatingMessages[i].update()
            floatingMessages[i].draw(ctx)

            if (floatingMessages[i].lifespan > 50) {
                floatingMessages.splice(i, 1)
                i--
            }
        }

        console.log(floatingMessages)
    }

    // Enemies

    function handleEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw(ctx)
            enemies[i].update()
            // handle game over
            if (enemies[i].x < 0) {
                gameOver = true
            }
            if (enemies[i].health <= 0) {
                let gainedResources = enemies[i].maxHealth / 10
                floatingMessages.push(
                    new FloatingMessage('+' + gainedResources, enemies[i].x, enemies[i].y, 30, 'black'),
                    new FloatingMessage('+' + gainedResources, cellSize, cellSize / 4, 30, 'black'),
                )
                numberOfResources += gainedResources
                score += gainedResources
                const findThisIndex = enemyPositions.indexOf(enemies[i].y)
                enemyPositions.splice(findThisIndex, 1)
                enemies.splice(i, 1)
                i--
            }
        }
        if (frame % enemiesInterval === 0 && score < winningScore) {
            let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize
            enemies.push(new Enemy(canvas.width, verticalPosition))
            enemyPositions.push(verticalPosition)
            if (enemiesInterval > 120) {
                enemiesInterval -= 100
            }
        }
    }

    // resources
    function handleResources() {
        if (frame % 500 === 0 && score < winningScore) {
            resources.push(new Resource(canvas.width))
        }
        for (let i = 0; i < resources.length; i++) {
            resources[i].update()
            resources[i].draw(ctx)
            // check collision between resource and mouse
            if (resources[i] && mouse.x && mouse.y && collisionDetection(resources[i], mouse)) {
                numberOfResources += resources[i].amount
                floatingMessages.push(
                    new FloatingMessage('+' + resources[i].amount, resources[i].x, resources[i].y, 30, 'green'),
                )
                floatingMessages.push(
                    new FloatingMessage('+' + resources[i].amount, cellSize, cellSize / 3, 20, 'green'),
                )
                resources.splice(i, 1)
                i--
            }
        }
    }

    // utilities
    function handleGameStatus() {
        ctx.fillStyle = 'gold'
        ctx.font = '20px Creepster'
        ctx.fillText('Score: ' + score, 10, 20)
        ctx.fillText('Resources: ' + numberOfResources, 10, 40)
        if (gameOver) {
            ctx.fillStyle = 'black'
            ctx.font = '90px Creepster'
            ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2)
        }
        if (score >= winningScore && enemies.length === 0) {
            ctx.fillStyle = 'black'
            ctx.font = '60px Creepster'
            ctx.fillText('You Win!', canvas.width / 2 - 50, canvas.height / 2)
            ctx.font = '20px Creepster'
            ctx.fillText('Your score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 50)
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 0, controlsBar.width, controlsBar.height)

        handleGameGrid()
        handleDefenders()
        handleProjectiles()
        handleEnemies()
        handleResources()
        handleGameStatus()
        handleFloatingMessages()

        frame++

        if (!gameOver) requestAnimationFrame(animate)
    }

    animate()

    // add listener for screen resize
    window.addEventListener('resize', function () {
        canvasPosition = canvas.getBoundingClientRect()
    })
}
