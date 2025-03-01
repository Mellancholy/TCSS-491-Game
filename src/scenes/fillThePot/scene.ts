import Pot from "./pot.js";
import Faucet from "./faucet.js";
import { ASSET_MANAGER } from "src/main.js";
import Scene from "src/scene.js";
import GameObject from "src/gameObject.js";
import GameEngine from "src/gameEngine.js";


export class FillThePotScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;
    
    constructor(game: GameEngine, x: number, y: number) {
        super(game)
        this.game = game;
        this.x = x;
        this.y = y;
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));
        const pot = new Pot(this.game)
        this.addGameObject(pot);
        this.addGameObject(new Faucet(this.game, pot));
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
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/FillThePot_Background.png") as HTMLImageElement;
    };

    update() {
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}