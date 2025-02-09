import GameObject from "../gameObject.js"
import { ASSET_MANAGER } from "../main.js"

export default class RotateIcon extends GameObject {

    constructor(game, x, y) {
        super(game);
        this.game = game
        this.x = x
        this.y = y
        this.angle = Math.PI / 3
    }

    update() {
        this.angle += Math.PI / 180
    }

    draw(ctx) {
        const WIDTH = 450
        const HEIGHT = 450
        const sprite = ASSET_MANAGER.getAsset('./assets/rotate.png')
        ctx.save();
        ctx.translate(1024/2,768/2);
        ctx.rotate(this.angle);
        ctx.drawImage(sprite, -WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT);
        ctx.restore();
        
    }
}

