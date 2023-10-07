import { CELL_SIZE } from '../constant'
import Projectile from './projectile'

export default class Defender {
    readonly width: number = CELL_SIZE
    readonly height: number = CELL_SIZE
    public timer: number = 0
    public health: number = 100
    readonly color: string = 'blue'
    readonly healthColor: string = 'gold'
    public shooting: boolean = false

    constructor(public x: number, public y: number) {}

    update(projectiles: Projectile[]) {
        if (this.shooting) {
            this.timer++
            if (this.timer % 100 === 0) {
                projectiles.push(new Projectile(this.x + this.width, this.y + this.height / 2))
            }
        } else {
            this.timer = 0
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.healthColor
        ctx.font = '20px Creepster'
        ctx.fillText(Math.floor(this.health).toString(), this.x, this.y + 20)
    }
}
