export default class Projectile {
    readonly width: number = 10
    readonly height: number = 10
    readonly power: number = 20
    readonly speed: number = 5
    readonly color: string = 'green'
    constructor(public x: number, public y: number) {}
    update() {
        this.x += this.speed
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2)
        ctx.fill()
    }
}
