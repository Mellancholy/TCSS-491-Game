import { ASSET_MANAGER } from "../../main.js";
import Scene from "../../scene.js";
import GameObject from "../../gameObject.js";
import { sceneManage, rollManage } from '../../main.js';
import { DnDButton } from "../../button.js";
import Ingredient from "../counter/food.js";

export class RiceStationScene extends Scene {
    constructor(game) {
            super(game)
            Object.assign(this, { game });
        };

    initalizeScene() {
            this.addGameObject(new Background(this.game, 0, 0));
            this.addGameObject(new BambooMat(this.game, 450, 375));

            const foods = [
                {
                    name: "rice", 
                    img: "./assets/objects/Rice_Cooked.png",
                    xOffset: 0,
                    yOffset: -10
                },
                {
                    name: "nori", 
                    img: "./assets/objects/Nori.png",
                    xOffset: 0,
                    yOffset: 0
                }
            ]
            const riceCooker = new RiceCooker(this.game, foods[0], 10, 10, 512, 512)
            this.addGameObject(riceCooker);
            riceCooker.addButton();

            const nori = new Nori(this.game, foods[1], 500, 80, 450, 300)
            this.addGameObject(nori);
            nori.addButton();

        }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}

class RiceCooker extends GameObject {
    constructor(game, food, x, y, width, height) {
        super(game);
        Object.assign(this, { game, food, x, y, width, height, amount: 5, cookerClicked : false});
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, this.food.img, () => {
            console.log("clicked on food bin", this.food);
            this.cookerClicked = true;
            this.amount--;
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = this.food;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {
        if (this.cookerClicked) {
            if (this.amount == 0) {
                this.beginMinigame();
                this.amount = 5;
            }
        }
    };

    draw(ctx) {
        if (this.amount <= 10 && this.amount > 5) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else if (this.amount <= 5 && this.amount > 1) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png");
            ctx.drawImage(sprite, this.x, this.y);
        }

    };

    beginMinigame() {
        const minigame = Math.floor(Math.random() * 3);
        console.log(minigame);
        if (minigame == 0) {
            sceneManage.loadScene("fill");
            console.log("minigame 1")
        } else if (minigame == 1) {
            sceneManage.loadScene("burn");
            console.log("minigame 2")
        } else if (minigame == 2) {
            sceneManage.loadScene("wash");
            console.log("minigame 3")
        }
    }   
}

class Nori extends GameObject {
    constructor(game, food, x, y, width, height) {
        super(game);
        Object.assign(this, { game, food, x, y, width, height});
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, this.food.img, () => {
            console.log("clicked on food bin", this.food);
            this.amount--;
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = this.food;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {

    };

    draw(ctx) {
        const sprite = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png");
        ctx.drawImage(sprite, this.x, this.y, sprite.width, sprite.height);

    };
}

class BambooMat extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y, foods: [] });
        this.matSprite = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png");
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.matSprite, this.x, this.y);
        const centerX = this.x + (this.matSprite.width / 2)
        const centerY = this.y + (this.matSprite.height / 2)
        this.foods.forEach(element => {
            const img = ASSET_MANAGER.getAsset(element.img)
            ctx.drawImage(img, centerX - (img.width / 2) + element.xOffset, centerY - (img.height / 2) + element.yOffset, img.width, img.height);
        });
    };

    onDnDDrop(e) {
        // console.log(e);
        // console.log(e.detail)
        console.log(e.detail.y);
        if(e.detail.x >= this.x && e.detail.x <= this.x + 512 &&
            e.detail.y >= this.y && e.detail.y <= this.y + 512) {
            console.log("dropped in food bottom");
            this.foods.push(e.detail.button.food);
            rollManage.addIngredient(new Ingredient(e.detail.button.food.name, e.detail.button.food.img));
        }
    }
}
