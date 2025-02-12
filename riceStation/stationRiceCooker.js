import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class StationRiceCooker extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.amount = 5;
        this.cookTimer = 0;
    }

    update() {

    }

    draw(ctx) {
        const sprite = ASSET_MANAGER.getAsset("./assets/objects/Rice_Opened.png");
        ctx.drawImage(sprite, this.x, this.y);
    }
}