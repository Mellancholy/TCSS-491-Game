import RiceCooker from "./ricecooker.js";
import TimerBar from "./timerBar.js";
import { ASSET_MANAGER } from "src/main.js";
import Scene from "src/scene.js";
import GameEngine from "src/gameEngine.js";
import GameObject from "src/gameObject.js";


export class DontBurnRiceScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;
    
    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        let timeBar = new TimerBar(this.game, 10);
        let riceCooker = new RiceCooker(this.game);
        this.addGameObject(riceCooker);
        this.addGameObject(timeBar);

    }
}

class Background extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    spritesheet: HTMLImageElement;
    
    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Minigame_Background.png") as HTMLImageElement;
    };

    update() {
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}
