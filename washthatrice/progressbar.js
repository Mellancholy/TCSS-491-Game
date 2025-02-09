export default class ProgressBar {

    constructor(game, x, y, width, height) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.progress = 0.01
    }

    update() {
        if(this.progress >= 1) {
            this.game.win = true
            return
        }
        if(this.game.spinning && this.progress < 1) {
            this.progress += 0.001
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width * this.progress, this.height);
    }
}