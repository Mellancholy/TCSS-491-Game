import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class Customer extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/dummy.png");
        this.width = 200;
        this.height = 200;
        Object.assign(this, { game, x, y });
        this.walkTo(200, 280)
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    };

    walkTo(x, y) {
        setInterval(() => {
            if(this.x === x && this.y === y) return;
            if (this.x < x) {
                this.x += 2;
            }
            if (this.y < y) {
                this.y += 2;
            }
            if (this.x > x) {
                this.x -= 2;
            }
            if (this.y > y) {
                this.y -= 2;
            }
        }, 1000 / 60);
    }
}