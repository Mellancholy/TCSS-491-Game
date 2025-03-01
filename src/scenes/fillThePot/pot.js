import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";

export default class Pot extends GameObject {
    constructor(game) {
        super(game);
        this.game = game;
        this.liters = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/Pot_Animation.png");
        this.width = 380;
        this.height = 300;
        this.x = 322;
        this.y = 386;
    };

    update() {
        

    };

    draw(ctx) {
        if (this.liters == 0) {
            ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 100) {
            ctx.drawImage(this.spritesheet, 380, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 200) {
            ctx.drawImage(this.spritesheet, 760, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 300) {
            ctx.drawImage(this.spritesheet, 1140, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 400) {
            ctx.drawImage(this.spritesheet, 1520, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 500) {
            ctx.drawImage(this.spritesheet, 1900, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 600) {
            ctx.drawImage(this.spritesheet, 2280, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 700) {
            ctx.drawImage(this.spritesheet, 2660, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (this.liters <= 800) {
            ctx.drawImage(this.spritesheet, 3040, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.spritesheet, 3420, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    };
}
