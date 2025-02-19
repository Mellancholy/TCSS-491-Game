import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";

export default class Faucet extends GameObject {
    constructor(game, pot) {
        super(game);
        this.game = game;
        this.pot = pot;
        this.isOn = false;
        this.gameOver = false;
    };

    update() {
        // If faucet is on, add water to pot
        if (this.isOn) {
            this.pot.liters++;
            console.log(this.pot.liters);
        }
    };

    draw(ctx) {
        if (this.isOn) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/objects/Faucet_On.png"), 565, 248);
        } else {
            ctx.drawImage(ASSET_MANAGER.getAsset("./assets/objects/Faucet_Off.png"), 565, 285);
        }

        // Drawing hit box
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.rect(550, 285, 50, 50);
        ctx.stroke();
    };

    faucetManager(mouseX, mouseY) {
        if (mouseX >= 550 && mouseX <= 550 + 50 && mouseY >= 285 && mouseY <= 285 + 45 && !this.isOn) {
            this.isOn = true;
            console.log(this.isOn);
        } else if (mouseX >= 550 && mouseX <= 550 + 50 && mouseY >= 285 && mouseY <= 285 + 45 && this.isOn) {
            this.isOn = false;
            console.log(this.isOn);
        }
    }
}