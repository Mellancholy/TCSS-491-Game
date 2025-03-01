import { ASSET_MANAGER } from "../../main.js";
import  Background  from "../../background.js";
import Scene from "../../scene.js";
import GameObject from "../../gameObject.js";
import { sceneManage, rollManage } from '../../main.js';
import { DnDButton } from "../../button.js";
import Ingredient from "../counter/food.js";
import { WRAP } from "../counter/food.js";

export class RiceStationScene extends Scene { 
    constructor(game) {
            super(game)
            Object.assign(this, { game });
        };

    initalizeScene() {
            this.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));
            console.log("HIDDEN:" + this.persistentObjects);
            this.restoreHiddenObjects();

            this.addGameObject(new BambooMat(this.game, 450, 375));

            const riceCooker = new RiceCooker(this.game, 10, 10, 512, 512)
            this.addGameObject(riceCooker);

            const nori = new Nori(this.game, 500, 80, 450, 300)
            this.addGameObject(nori);

        }
}

class RiceCooker extends GameObject {
    constructor(game, x, y, width, height) {
        super(game, 'ricecooker', true);
        Object.assign(this, { game, x, y, width, height});
        this.amount = 5;
        this.cookerClicked = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png");
        this.addButton();
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, WRAP[0].img, () => {
            console.log("clicked on rice cooker");
            this.cookerClicked = true;
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = WRAP[0];
        this.dnd.persistent = true;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {
        if (this.cookerClicked) {
            this.amount--;
            if (this.amount == 0) {
                this.beginMinigame();
                this.amount = 5;
            }
            this.cookerClicked = false;
        }
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y);
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
    constructor(game, x, y, width, height) {
        super(game, 'norisource');
        Object.assign(this, { game, x, y, width, height});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png");
        this.addButton();
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, WRAP[1].img, () => {
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = WRAP[1];
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y);

    };
}

class BambooMat extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y});
        this.ingredients = [];
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png");
    };

    update() {
        
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y);
        const centerX = this.x + (this.spritesheet.width / 2)
        const centerY = this.y + (this.spritesheet.height / 2)

        // Draw the ingredients on top of the bamboo mat
        this.ingredients.forEach(element => {
            const img = ASSET_MANAGER.getAsset(element.img)
            ctx.drawImage(img, this.x, this.y);
            // ctx.drawImage(img, centerX - (img.width / 2) + element.xOffset, centerY - (img.height / 2) + element.yOffset, img.width, img.height);
        });
    };

    onDnDDrop(e) {
        // console.log(e);
        // console.log(e.detail)
        // console.log(e.detail.y);
        if(e.detail.x >= this.x && e.detail.x <= this.x + 512 &&
            e.detail.y >= this.y && e.detail.y <= this.y + 512) {
            console.log("dropped in food bottom");
            this.ingredients.push(e.detail.button.food);
            rollManage.addIngredient(new Ingredient(e.detail.button.food.type, e.detail.button.food.img));
        }
    }
}
