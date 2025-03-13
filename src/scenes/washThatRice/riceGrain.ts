import { ASSET_MANAGER } from "src/main.js";
import GameEngine from "src/gameEngine"
import GameObject from "src/gameObject.js"
import { randomIntRange } from "src/util.js"

const COLORS = [
    '#f5f5f5',
    '#f8f8f8',
    '#fafafa',
    '#fcfcfc',
    '#ffffff',
    '#fefefe',
    '#fdfdfd',
    '#fbfbfb',
    '#f7f7f7',
    '#f4f4f4'
]

export default class RiceGrain extends GameObject{
    game: GameEngine
    angle: number
    centerX: number
    centerY: number
    rotation: number

    constructor(game: GameEngine, angle: number, centerX: number, centerY: number) {
        super(game);
        this.game = game
        this.angle = angle
        this.centerX = centerX
        this.centerY = centerY
        this.rotation = randomIntRange(0, Math.PI * 2)
    }

    update() {
        if(this.game.spinning) {
            this.angle += Math.PI / 180
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const inside = ASSET_MANAGER.getAsset('./assets/objects/inside_rice.png') as HTMLImageElement;
        const middle = ASSET_MANAGER.getAsset('./assets/objects/middle_rice.png') as HTMLImageElement;
        const outside = ASSET_MANAGER.getAsset('./assets/objects/outside_rice.png') as HTMLImageElement;

        // Translate to the center of rotation
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.angle);

        ctx.drawImage(outside, -outside.width / 2, -outside.height / 2);
        ctx.drawImage(middle, -middle.width / 2, -middle.height / 2);
        ctx.drawImage(inside, -inside.width / 2, -inside.height / 2);

        ctx.restore();
    }
}