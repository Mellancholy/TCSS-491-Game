import GameObject from "../../gameObject.js"

export default class ProgressBar extends GameObject{

    constructor(game, x, y, width, height) {
        super(game);
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
            const currentData = this.game.addSharedData("riceCooker");
            const newAmount = currentData ? currentData.amount + 5 : 5;
            this.game.addSharedData("riceCooker", {amount: newAmount});
            setTimeout(() => {
                this.game.sceneManager.loadScene("rice")
            }
            , 2000)
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