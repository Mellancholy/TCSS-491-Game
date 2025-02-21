import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class Nori extends GameObject {
    constructor(game, x, y) {
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
            if (this.amount == 0) {
                //this.beginMinigame();
                this.amount = 5;
            } else {
                this.noriX = this.game.mouse.x - this.offsetX;
                this.noriY = this.game.mouse.y - this.offsetY;
            }
        }
    }

    draw(ctx) {
        const sprite = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png");
        ctx.drawImage(sprite, this.x, this.y, sprite.width / 2, sprite.height / 2);

        if (this.noriClicked) {
            const noriSprite = ASSET_MANAGER.getAsset("./assets/objects/Nori.png");
            ctx.drawImage(noriSprite, this.noriX, this.noriY, noriSprite.width / 2, noriSprite.height / 2);
        }
    }

    // Evan was here :)

    createNoriAndDrag(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + 512 && mouseY >= this.y && mouseY <= this.y + 512) {
            this.noriClicked = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
        }
    }

    // Stop dragging when mouse is released
    stopDragging() {
        this.noriClicked = false;
    };

    onMouseDown(e) {
        this.createNoriAndDrag(this.game.mouse.x, this.game.mouse.y);
    }

    onMouseUp(e) {
        this.stopDragging();
    }
}