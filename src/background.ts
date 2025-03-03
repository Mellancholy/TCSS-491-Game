import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";
import GameEngine from "./gameEngine.js";

export default class Background extends GameObject {
    game: GameEngine;
    spritesheet: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(game: GameEngine, spritesheet: string, x = 0, y = 0, width = 0, height = 0) {
        super(game, 'background');
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset(spritesheet) as HTMLImageElement;
        this.x = x;
        this.y = y;


        if (width == 0 && height == 0) {
            this.width = this.spritesheet.width;
            this.height = this.spritesheet.height;
        } else{
            this.width = width;
            this.height = height;
        }
    }

    update() {
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    }
}