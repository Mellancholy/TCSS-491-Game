import GameObject from "../gameObject.js"
import { ASSET_MANAGER } from "../main.js"

export default class Hand extends GameObject {

    constructor(game, x, y) {
        super(game);
        this.game = game
        this.x = x
        this.y = y
    }

    update() {
        if (this.game.mouse) {
            this.x = this.game.mouse.x
            this.y = this.game.mouse.y
        }
    }

    draw(ctx) {
        const w = 300
        const h = 300
        const sprite = ASSET_MANAGER.getAsset('./assets/hand.png')
        ctx.drawImage(sprite, this.x - (w / 2), this.y - (h / 2), w, h);
    }
}