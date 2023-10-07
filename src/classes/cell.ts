import Mouse from './mouse'
import { CELL_SIZE } from '../constant'
import { collisionDetection } from '../utils'

export default class Cell {
    readonly width: number = CELL_SIZE
    readonly height: number = CELL_SIZE
    color: string = 'black'
    constructor(public x: number, public y: number) {}

    draw(ctx: CanvasRenderingContext2D, mouse: Mouse) {
        if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
            this.color = 'red'
            ctx.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
}
