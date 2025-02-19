import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class Pot extends GameObject {
    constructor(game) {
        super(game);
        this.game = game;
        this.liters = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/Pot_Animation.png");
    };

    update() {
        

    };

    draw(ctx) {
        if (this.liters == 0) {
            ctx.drawImage(this.spritesheet, 0, 0, 380, 300, 322, 386, 380, 300);
        }
    };
}
