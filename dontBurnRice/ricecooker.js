import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";
import TimerBar from "./timerBar.js";

export default class RiceCooker extends GameObject {
    constructor(game) {
        super(game);
        this.game = game;
        this.x = 237;
        this.y = 100;
        this.w = 550;
        this.h = 525;

        this.clicked = false;
    }

    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.w &&
            mouseY >= this.y &&
            mouseY <= this.y + this.h
        );
    }

    handleClick() {
        const timerBar = this.game.entities.find(entity => entity instanceof TimerBar);

        if (timerBar) {
            if (!this.clicked) {
                this.clicked = true;
                timerBar.start();
                //console.log("RiceCooker clicked! Timer started.");
            } else {
                this.clicked = false;
                timerBar.stop();
                //console.log("RiceCooker clicked again! Timer stopped.");
            }
        }
    }

    update() {
        
    }

    draw(ctx) {
        //console.log("RiceCooker draw method called");
        const off = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Off.png");
        const on = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_On.png");

        ctx.drawImage(off, this.x, this.y, this.w, this.h);

        if (this.clicked) {
            ctx.drawImage(on, this.x, this.y, this.w, this.h);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
}