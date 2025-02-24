import Pot from "./pot.js";
import Faucet from "./faucet.js";
import { ASSET_MANAGER } from "../../main.js";
import Scene from "../../scene.js";
import GameObject from "../../gameObject.js";


export class FillThePotScene extends Scene {
    constructor(game, x, y) {
        super(game)
        Object.assign(this, { game, x, y });
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        const pot = new Pot(this.game)
        this.addGameObject(pot);
        this.addGameObject(new Faucet(this.game, pot));
    }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/FillThePot_Background.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}