import Scene from '../scene.js';
import GameObject from '../gameObject.js';
import { ASSET_MANAGER } from "../main.js";
import { DnDButton } from "../button.js";

export class RiceAssemblyScene extends Scene {
    constructor(game) {
        super(game);
        Object.assign(this, { game });
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game));
        this.addGameObject(new FoodBottom(this.game, 1024 / 2, 300, 1, 1));
        const binWidth = 80;
        const binHeight = 80;
        const foods = [
            {
                name: "rice",
                img: "./assets/assembly/crab.png",
            },
            {
                name: "avocado",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "crab",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "cucumber",
                img: "./assets/assembly/crab.png",
            },
            {
                name: "salmon",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "tuna",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "shrimp",
                img: "./assets/assembly/crab.png",
            },
            {
                name: "eel",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "uni",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "tamago",
                img: "./assets/assembly/crab.png",
            },
            {
                name: "idk",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "idk",
                img: "./assets/assembly/cucumber.png",
            }
        ]
        let curFood = 0;
        let y = 510;
        for(let x = 0; x < 12; x++) {
            const foodBin = new FoodBin(this.game, foods[curFood], 10 + x * (binWidth + 4), y, binWidth, binHeight);
            this.addGameObject(foodBin);
            foodBin.addButton(); // add the button to the scene after the bin is added
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

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, this.food.img, () => {
            console.log("clicked on food bin", this.food);
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/assembly/tray.jpg"), this.x, this.y, this.width, this.height);
        
        const bottomWidth = 80
        const bottomHeight = 35
        const xOffset = this.width - bottomWidth
        const yOffset = this.height - (bottomHeight)
        const xCount = 3
        const xSpace = bottomWidth / xCount
        const yCount = 3
        const ySpace = bottomHeight / yCount;
        for(let row = 0; row < yCount; row++) {
            for(let col = 0; col < xCount; col++) {
                ctx.drawImage(ASSET_MANAGER.getAsset(this.food.img), this.x + xOffset + (xSpace * col), this.y + (yOffset / 2) - 5 + (ySpace * row))
            }
        }
    };
}

class FoodBottom extends GameObject {
    constructor(game, x, y, width, height) {
        super(game);
        Object.assign(this, { game, x, y, width, height });
    };

    update() {
        
    };

    draw(ctx) {

    };

    onDnDDrop(e) {
        console.log("dropped");
        console.log(e);
    }
}