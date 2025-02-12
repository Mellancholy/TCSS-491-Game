import { ASSET_MANAGER } from "../main.js";
import Scene from "../scene.js";
import GameObject from "../gameObject.js";

export class RiceStationScene extends Scene {
    constructor(game, x, y) {
            super(game)
            Object.assign(this, { game, x, y });
        };

    initalizeScene() {
            this.addGameObject(new Background(this.game, 0, 0));
        }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}