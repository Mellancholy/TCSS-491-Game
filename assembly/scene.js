import Scene from '../scene.js';
import GameObject from '../gameObject.js';
import { ASSET_MANAGER } from "../main.js";

export class RiceAssemblyScene extends Scene {
    constructor(game) {
        super(game);
        Object.assign(this, { game });
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game));
        const binWidth = 80;
        const binHeight = 80;
        const foods = [
            {
                name: "rice",
                color: "white",
            },
            {
                name: "avocado",
                color: "green",
            },
            {
                name: "crab",
                color: "red",
            },
            {
                name: "cucumber",
                color: "green",
            },
            {
                name: "salmon",
                color: "pink",
            },
            {
                name: "tuna",
                color: "red",
            },
            {
                name: "shrimp",
                color: "pink",
            },
            {
                name: "eel",
                color: "brown",
            },
            {
                name: "uni",
                color: "orange",
            },
            {
                name: "tamago",
                color: "yellow",
            },
            {
                name: "idk",
                color: "gray",
            },
            {
                name: "idk",
                color: "gray",
            }
        ]
        let curFood = 0;
        let y = 510;
        for(let x = 0; x < 12; x++) {
            this.addGameObject(new FoodBin(this.game, foods[curFood], 10 + x * (binWidth + 4), y, binWidth, binHeight));
            curFood++;
        }
    }
}

class Background extends GameObject {
    constructor(game) {
        super(game);
        Object.assign(this, { game });
    }

    update() {}

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Backgrounds.png"), 0, 0, 1024, 768);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/assembly/case.jpg"), 0, 420, 1024, 197);
    }
}

class FoodBin extends GameObject {
    constructor(game, food, x, y, width, height) {
        super(game);
        Object.assign(this, { game, food, x, y, width, height });
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/assembly/tray.jpg"), this.x, this.y, this.width, this.height);
        let offset = 24;
        ctx.fillStyle = this.food.color;
        ctx.fillRect(this.x + offset, this.y + offset, this.width - (offset * 2), this.height - (offset * 2));
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x + offset, this.y + offset, this.width - (offset * 2), this.height - (offset * 2));
    };
}
