import GameEngine from "src/gameEngine";
import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";

export default class Nori extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    noriX: number;
    noriY: number;
    noriClicked: boolean;
    offsetX: number;
    offsetY: number;
    roll: null;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;

        this.noriX = 10;
        this.noriY = 10;
        this.noriClicked = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.roll = null;
    }

    update() {
        if (this.noriClicked) {
            this.noriX = this.game.mouse.x - this.offsetX;
            this.noriY = this.game.mouse.y - this.offsetY;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const sprite = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png");
        ctx.drawImage(sprite, this.x, this.y, sprite.width / 2, sprite.height / 2);

        if (this.noriClicked) {
            const noriSprite = ASSET_MANAGER.getAsset("./assets/objects/Nori.png");
            ctx.drawImage(noriSprite, this.noriX, this.noriY, noriSprite.width / 2, noriSprite.height / 2);
        }
    }

    // Evan was here :)

    createNoriAndDrag(mouseX: number, mouseY: number) {
        if (mouseX >= this.x && mouseX <= this.x + 512 && mouseY >= this.y && mouseY <= this.y + 512) {
            this.noriClicked = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
            this.game.currentDraggedItem = this;
        }
    }

    // Stop dragging when mouse is released
    stopDragging() {
        this.noriClicked = false;
        this.game.currentDraggedItem = null;
    };

    onMouseDown(e: MouseEvent) {
        this.createNoriAndDrag(this.game.mouse.x, this.game.mouse.y);
    }

    onMouseUp(e: MouseEvent) {
        this.stopDragging();
    }
}