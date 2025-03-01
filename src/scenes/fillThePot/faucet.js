import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";

export default class Faucet extends GameObject {
    constructor(game, pot) {
        super(game);
        this.game = game;
        this.isOn = false;
        this.pot = pot
        this.gameWon = false;
        this.gameOver = false;
    };

    update() {
        // If faucet is on, add water to pot
        if (this.isOn) {
            this.pot.liters++;
            console.log(this.pot.liters);
        }

        if (!this.isOn && this.pot.liters > 0) {
            if (this.pot.liters >= 700 && this.pot.liters < 800 && !this.gameWon) {
                this.gameWon = true; 
                console.log(this.gameWon); // debugging
                const currentData = this.game.addSharedData("riceCooker");
                const newAmount = currentData ? currentData.amount + 5 : 5;
                this.game.addSharedData("riceCooker", {amount: newAmount});
                setTimeout(() => {
                    this.game.sceneManager.loadScene("rice")
                }
                , 2000)
            } else {
                this.gameWon = false;
            }
            this.gameOver = true;
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