import Cup from "./cup.js";
import WaterPitcher from "./waterPitcher.js";
import { ASSET_MANAGER } from "../main.js";
import Scene from "../scene.js";
import GameObject from "../gameObject.js";


export class FillThePotScene extends Scene {
    constructor(game, x, y) {
        super(game)
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");
        Object.assign(this, { game, x, y });
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        let cup = new Cup(this.game);
        this.addGameObject(cup);
        this.addGameObject(new WaterPitcher(this.game, cup));
    }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}