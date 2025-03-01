import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";
import Animator from "./animator.js";
import GameEngine from "src/gameEngine.js";

export default class Fly extends GameObject {
    game: GameEngine
    animator: Animator;
    x: number;
    y: number;
    speed: number;
    isSquashed: (() => void) | null;
    radius: number;
    
    constructor(game: GameEngine) {
        super(game);
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/flies.png"), 0, 0,
            65, 80, 9, .2);
        this.x = Math.random() * 500;
        this.y = Math.random() * 400;
        this.speed = 100;
        this.isSquashed = null;
        this.radius = 60; // Approximate radius for collision
    };

    update() {
        this.x += this.speed*this.game.clockTick!;
        if(this.x > 700) {
            this.x = Math.random() * 500;
            this.y = Math.random() * 500;
        }
    };

    getBoundingCircle() {
        return {
            x : this.x + 50,
            y: this.y + 70,
            radius: this.radius
        };
    };

    draw(ctx: CanvasRenderingContext2D) {
        this.animator.drawFrame(this.game.clockTick!, ctx, this.x, this.y);
        //ctx.drawImage(ASSET_MANAGER.getAsset("./PngItem_2222200.png"),0,0)

        // Draw bounding circle
        // ctx.beginPath();
        // let circle = this.getBoundingCircle();
        // ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        // ctx.strokeStyle = "red"; // Make circle visible
        // ctx.stroke();
    };
}