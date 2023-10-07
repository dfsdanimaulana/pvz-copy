import { CELL_SIZE } from '../constant'

export default class Enemy {
    readonly width: number = CELL_SIZE
    readonly height: number = CELL_SIZE
    public speed: number = Math.random() * 0.2 + 0.4
    public movement: number = this.speed
    readonly color: string = 'red'
    public health: number = 100
    readonly healthColor: string = 'gold'
    public maxHealth: number = this.health
    public damage: number = 0.2

    constructor(public x: number, public y: number) {}

    update() {
        this.x -= this.movement
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.healthColor
        ctx.font = '20px Creepster'
        ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20)
    }
}
