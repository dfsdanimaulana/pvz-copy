import { CELL_SIZE } from '../constant'
import { getRandomValueFromArray } from '../utils'

export default class Resource {
    public x: number
    public y: number
    readonly color: string = 'yellow'
    readonly width: number = CELL_SIZE * 0.6
    readonly height: number = CELL_SIZE * 0.6
    readonly amounts: number[] = [30, 40, 50]
    readonly amount: number = getRandomValueFromArray(this.amounts)

    constructor(public canvasWidth: number) {
        this.x = Math.random() * (this.canvasWidth - CELL_SIZE)
        this.y = Math.floor(Math.random() * 5 + 1) * CELL_SIZE + 25
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'black'
        ctx.font = '20px Creepster'
        ctx.fillText(this.amount.toString(), this.x + 15, this.y + 25)
    }
}
