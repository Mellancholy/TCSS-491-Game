import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";
import Scene from "../scene.js";
import FlySpawner from "./flySpawner.js";
import Swatter from "./swatter.js";

export default class SwatTheFliesScene extends Scene {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y})
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Order_Background.JPG");
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        this.addGameObject(new FlySpawner(this.game, 20, 1500));
        this.addGameObject(new Swatter(this.game));
    }
}

class Background extends GameObject{
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Roll_Background.JPG");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}
