import GameEngine from "src/gameEngine"
import GameObject from "src/gameObject.js"
import { ASSET_MANAGER } from "src/main.js"

export default class RotateIcon extends GameObject {
    game: GameEngine
    x: number
    y: number
    angle: number

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game
        this.x = x
        this.y = y
        this.angle = Math.PI / 3
    }

    update() {
        this.angle += Math.PI / 180
    }

    draw(ctx: CanvasRenderingContext2D) {
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

