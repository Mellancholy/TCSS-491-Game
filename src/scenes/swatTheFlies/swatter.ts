import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";
import Fly from "./fly.js";
import { isColliding } from "src/util.js";
import GameEngine from "src/gameEngine.js";

export default class Swatter extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    isDragging: boolean;
    offsetX: number;
    offsetY: number;
    isPressed: boolean;
    radius: number;

    constructor(game: GameEngine) {
        super(game);
        this.game = game;
        this.x = 500; // Initial x position
        this.y = 175; // Initial y position
        this.isDragging = false; // Flag for dragging
        this.offsetX = 0; // Mouse offset when dragging
        this.offsetY = 0; // Mouse offset when dragging

        this.isPressed = false;
        this.radius = 20;
    };

    update() {
        if (this.isDragging && this.game.move) {
            this.x = this.game.move.x - this.offsetX;
            this.y = this.game.move.y - this.offsetY;
        }
        if (this.game.keys[" "]) {
            let swatCircle = this.getBoundingCircle();

            this.game.entities = this.game.entities.filter(entity => {
                if (entity instanceof Fly && isColliding(swatCircle, entity.getBoundingCircle())) {
                    console.log("Fly Swatted!");
                    return false;
                }
                return true;
            })
        }
    };

    getBoundingCircle() {
        return {
            x : this.x + 110,
            y: this.y + 160,
            radius: this.radius
        };
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/swatter.png") as HTMLImageElement,this.x,this.y)

        // Draw bounding circle
        // ctx.beginPath();
        // let circle = this.getBoundingCircle();
        // ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        // ctx.strokeStyle = "red"; // Make circle visible
        // ctx.stroke();
    };

    onMouseDown(e: MouseEvent) {
        this.startDragging(e.x, e.y);
    };

    onMouseUp(e: MouseEvent) {
        this.stopDragging();
    }

    startDragging(mouseX: number, mouseY: number) {
        if (mouseX >= this.x && mouseX <= this.x + 325 && mouseY >= this.y && mouseY <= this.y + 350) {
            this.isDragging = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
        }
    };

    stopDragging() {
        this.isDragging = false;
    };

    startSpace() {
        if (this.isDragging) {
            this.isPressed = true;
        }
    };

    stopSpace() {
        if (this.isDragging) {
            this.isPressed = false;
        }
    };
}