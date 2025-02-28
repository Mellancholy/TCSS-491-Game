import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";

export default class Background extends GameObject {
    constructor(game, spritesheet, x = 0, y = 0, width = 0, height = 0) {
        super(game, 'background');
        Object.assign(this, { game , spritesheet});
        this.x = x;
        this.y = y;

        this.spritesheet = ASSET_MANAGER.getAsset(spritesheet);

        if (width == 0 && height == 0) {
            this.width = this.spritesheet.width;
            this.height = this.spritesheet.height;
        } else{
            this.width = width;
            this.height = height;
        }
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    }
}