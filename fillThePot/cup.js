import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class Cup extends GameObject {
    constructor(game) {
        super(game);
        this.game = game;
        this.liters = 0;
    };

    update() {
        

    };

    draw(ctx) {
        //TODO refactor this to be shorter
        if (this.liters == 0) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 0, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 0 && this.liters <= 40) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 325, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 40 && this.liters <= 80) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 650, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 80 && this.liters <= 120) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 975, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 120 && this.liters <= 160) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 1300, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 160 && this.liters <= 200) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 1625, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 200 && this.liters <= 240) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 1950, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 240 && this.liters <= 280) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 2275, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 280 && this.liters <= 320) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 2600, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 320 && this.liters <= 360) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 2925, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 360 && this.liters <= 400) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 3250, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 400  && this.liters <= 440) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 3575, 0, 325, 325, 300, 275, 325, 325);
        } else if (this.liters > 440) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/Cup.png"), 3900, 0, 325, 325, 300, 275, 325, 325);
        }
    };
}
