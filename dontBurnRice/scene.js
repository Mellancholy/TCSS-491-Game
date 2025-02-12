import RiceCooker from "./ricecooker.js";
import TimerBar from "./timerBar.js";
import { ASSET_MANAGER } from "../main.js";
import Scene from "../scene.js";
import GameObject from "../gameObject.js";


export class DontBurnRiceScene extends Scene {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
        Object.assign(this, { game, x, y });
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        let timeBar = new TimerBar(this.game, 10);
        let riceCooker = new RiceCooker(this.game);
        this.addGameObject(riceCooker);
        this.addGameObject(timeBar);

    }
}

class Background extends GameObject{
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
