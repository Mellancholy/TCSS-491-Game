import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class StationRiceCooker extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.riceX = x;
        this.riceY = y;
        this.amount = 10;
        this.cookerClicked = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    update() {
        if (this.cookerClicked) {
            this.riceX = this.game.mouse.x - this.offsetX;
            this.riceY = this.game.mouse.y - this.offsetY;
            console.log
        }
    }

    draw(ctx) {
        if (this.amount = 10) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Full.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else if (this.amount = 5) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Low.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Empty.png");
            ctx.drawImage(sprite, this.x, this.y);
        }

        if (this.cookerClicked) {
            const riceSprite = ASSET_MANAGER.getAsset("./assets/objects/Rice_Cooked.png");
            ctx.drawImage(riceSprite, this.riceX, this.riceY);
        }
    }

    // Start dragging when mouse is down inside the pitcher
    createRiceAndDrag(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + 512 && mouseY >= this.y && mouseY <= this.y + 400) {
            this.cookerClicked = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
            this.amount--;
            console.log(this.amount);
        }
    };

    // Stop dragging when mouse is released
    stopDragging() {
        this.cookerClicked = false;
    };
}