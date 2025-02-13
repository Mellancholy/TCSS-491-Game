import { ASSET_MANAGER } from "../main.js";
import Scene from "../scene.js";
import GameObject from "../gameObject.js";

import RiceCooker from "./stationRiceCooker.js";

export class RiceStationScene extends Scene {
    constructor(game, x, y) {
            super(game)
            Object.assign(this, { game, x, y });
        };

    initalizeScene() {
            this.addGameObject(new Background(this.game, 0, 0));
            this.addGameObject(new RiceCooker(this.game, 0, 20))
        }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
        this.mat = ASSET_MANAGER.getAsset("./assets/objects/BambooMat_Empty.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
        ctx.drawImage(this.mat, 450, 300);
    };
}