import { ASSET_MANAGER } from "src/main.js";
import  Background  from "src/background.js";
import Scene from "src/scene.js";
import GameObject from "src/gameObject.js";
import { sceneManage, rollManage } from 'src/main.js';
import { DnDButton } from "src/button.js";
import Ingredient from "src/scenes/counter/food.js";
import { WRAP } from "src/scenes/counter/food.js";
import GameEngine from "src/gameEngine";

export class RiceStationScene extends Scene { 
    game: GameEngine;
    
    constructor(game: GameEngine) {
            super(game);
        };

    initalizeScene() {
            super.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));

            super.addGameObject(new BambooMat(this.game, 450, 375));

            const riceCooker = new RiceCooker(this.game, 10, 10, 512, 512)
            super.addGameObject(riceCooker);

            const nori = new Nori(this.game, 500, 80, 450, 300)
            super.addGameObject(nori);

        }
}

class RiceCooker extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    amount: number;
    cookerClicked: boolean;
    spritesheet: HTMLImageElement;
    dnd: DnDButton;
    
    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game, 'riceCooker');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.amount = 0;
        this.cookerClicked = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png");
        this.addButton();
        super.loadSharedData();
    }

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, WRAP[0].img, () => {
            console.log("clicked on rice cooker");
            this.cookerClicked = true;
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = WRAP[0];
        this.dnd.persistent = true;
        this.dnd.id = 'ricesourcebuttons';
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {
        if (this.cookerClicked) {
            
            if (this.amount == 0) {
                this.beginMinigame();
                this.amount = 5;
            }
            this.amount--;
            this.cookerClicked = false;
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
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
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    spritesheet: HTMLImageElement;
    dnd: DnDButton;

    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game, 'norisource');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png");
        this.addButton();
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, WRAP[1].img, () => {
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = WRAP[1];
        this.dnd.persistent = true;
        this.dnd.id = 'norisourcebutton'
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {

    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, this.x, this.y);

    };
}

class BambooMat extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    ingredients: Ingredient[];
    spritesheet: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number) {
        super(game, 'bamboomat');
        this.x = x;
        this.y = y
        this.ingredients = [];
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png");
    };

    update() {
        
    };

    draw(ctx: CanvasRenderingContext2D) {
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

    onDnDDrop(e: CustomEvent) {
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
