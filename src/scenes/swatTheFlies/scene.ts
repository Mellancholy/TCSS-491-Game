import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";
import Scene from "src/scene.js";
import FlySpawner from "./flySpawner.js";
import Swatter from "./swatter.js";
import GameEngine from "src/gameEngine.js";

export default class SwatTheFliesScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;
    spritesheet: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.JPG") as HTMLImageElement
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        this.addGameObject(new FlySpawner(this.game, 20, 1500));
        this.addGameObject(new Swatter(this.game));
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
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png") as HTMLImageElement;
    };

    update() {
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}
