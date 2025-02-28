import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";

export class Background extends GameObject {
    constructor(game, spritesheet) {
        super(game);
        Object.assign(this, { game , spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset(spritesheet);
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    }
}