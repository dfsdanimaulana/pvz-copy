export default class FloatingMessage {
    public lifespan: number = 0
    public opacity: number = 1
    constructor(
        public value: string,
        public x: number,
        public y: number,
        public size: number,
        readonly color: string,
    ) {}
    update() {
        this.y -= 0.3
        this.lifespan += 1
        if (this.opacity > 0.01) {
            this.opacity -= 0.01
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.font = `${this.size}px Creepster`
        ctx.fillText(this.value, this.x, this.y)
        ctx.globalAlpha = 1
    }
}
