import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class WaterPitcher extends GameObject {
    constructor(game, cup) {
        super(game);
        this.game = game;
        this.cup = cup;
        this.flow = 0;
        this.x = 500;  // Initial x position
        this.y = 275;  // Initial y position
        this.isDragging = false;  // Flag for dragging
        this.offsetX = 0;  // Mouse offset when dragging
        this.offsetY = 0;  // Mouse offset when dragging
    };

    update() {
        // If the pitcher is being dragged, update position based on mouse movement
        if (this.isDragging) {
            this.x = this.game.mouse.x - this.offsetX;
            this.y = this.game.mouse.y - this.offsetY;
}

        if (this.game.down) {
            // Adjust flow rate based on mouse position (example)
            if (this.game.mouse.x >= 300 && this.game.mouse.x <= 950) {
                if (this.game.mouse.y <= 380 && this.game.mouse.y > 300) {
                    this.flow = 0.5;
                } else if (this.game.mouse.y <= 300 && this.game.mouse.y > 220) {
                    this.flow = 1;
                } else if (this.game.mouse.y <= 220) {
                    this.flow = 2;
                }
            }

            // Increase the cup's liters based on flow, and ensure it doesn't exceed the maximum
            this.cup.liters += this.flow;
            if (this.cup.liters > 500) {
                this.cup.liters = 500;
            }

            //console.log(this.cup.liters);  // Log the current liters for debugging
        }
    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/WaterPitcher.png"), this.x, this.y);
    };

    // Start dragging when mouse is down inside the pitcher
    startDragging(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + 325 && mouseY >= this.y && mouseY <= this.y + 325) {
            this.isDragging = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
        }
    };

    // Stop dragging when mouse is released
    stopDragging() {
        this.isDragging = false;
        this.x = 500;
        this.y = 275;
    };

}