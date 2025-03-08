import { ASSET_MANAGER } from "src/main.js";
import  Background  from "src/background.js";
import Scene from "src/scene.js";
import GameObject from "src/gameObject.js";
import { DnDButton } from "src/button.js";
import Ingredient, { NORI, Order, RICE, RICE_CARRY } from "src/scenes/counter/food.js";
import GameEngine from "src/gameEngine";
import GameState from "src/gameState";

export class RiceStationScene extends Scene { 
    game: GameEngine;
    
    constructor(game: GameEngine) {
            super(game);
            this.game = game;
        };

    initalizeScene() {
            super.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));

            super.addGameObject(new BambooMat(this.game, 450, 375));

            const riceCooker = new RiceCooker(this.game, 10, 10, 430, 430)
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
    dnd!: DnDButton;
    
    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game, 'riceCooker');
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.amount = 1;
        this.cookerClicked = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker.png") as HTMLImageElement;
        this.addButton();
        super.loadSharedData();
    }

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, RICE_CARRY, () => {
            console.log("clicked on rice cooker");
            this.cookerClicked = true;
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = RICE;
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
        if(this.game.options.debugging) {
            ctx.strokeStyle = "red";
            //ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        ctx.fillStyle = "red";
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        let amountString = this.amount.toString();
        if(this.amount == 0) {
            amountString = "Needs Refill!";
        }
        ctx.fillText(amountString, this.x + (this.spritesheet.width / 2), this.y + 200);
    };

    beginMinigame() {
        const minigame = Math.floor(Math.random() * 3);
        console.log(minigame);
        if (minigame == 0) {
            this.game.getSceneManager().loadScene("fill");
            console.log("minigame 1")
        } else if (minigame == 1) {
            this.game.getSceneManager().loadScene("burn");
            console.log("minigame 2")
        } else if (minigame == 2) {
            this.game.getSceneManager().loadScene("wash");
            console.log("minigame 3")
        }
    }

    deload(): void {
        super.deload();
        this.game.addSharedData("riceCooker", {amount: this.amount});
    }
}

class Nori extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    noriSourceSprite: HTMLImageElement;
    dnd!: DnDButton;

    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.noriSourceSprite = ASSET_MANAGER.getAsset("./assets/objects/Nori_Source.png") as HTMLImageElement;
        this.addButton();
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, NORI.img, () => {});
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = NORI;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {

    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.noriSourceSprite, this.x, this.y);

    };
}

class BambooMat extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    spritesheet: HTMLImageElement;
    sliding: boolean;;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png") as HTMLImageElement;
        this.sliding = false;
    };

    update() {
        
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, this.x, this.y);
        const centerX = this.x + (this.spritesheet.width / 2)
        const centerY = this.y + (this.spritesheet.height / 2)

        // Draw the ingredients on top of the bamboo mat
        const orderWorkingOn = GameState.getInstance().getState('orderWorkingOn');
        if(!orderWorkingOn) return;
        orderWorkingOn.ingredients.forEach(element => {
            const img = ASSET_MANAGER.getAsset(element.img) as HTMLImageElement;
            ctx.drawImage(img, this.x, this.y);
            // ctx.drawImage(img, centerX - (img.width / 2) + element.xOffset, centerY - (img.height / 2) + element.yOffset, img.width, img.height);
        });

        if (this.sliding) return;
        if (orderWorkingOn.ingredients.length == 2) {
            setTimeout(() => {
                setInterval(() => {
                    this.x += 10
                    if(this.x > 1024) {
                        this.removeFromWorld = true
                    }
                }, 10)
            }, 1000)
            this.sliding = true
            return;    
        }
    };

    onDnDDrop(e: CustomEvent) {
        // console.log(e);
        // console.log(e.detail)
        // console.log(e.detail.y);
        if(e.detail.x >= this.x && e.detail.x <= this.x + this.spritesheet.width &&
            e.detail.y >= this.y && e.detail.y <= this.y + this.spritesheet.height) {
            console.log("dropped in food bottom");
            let orderWorkingOn = GameState.getInstance().getState('orderWorkingOn')
            if(!orderWorkingOn) {
                let newOrder = new Order([], [], null);
                orderWorkingOn = GameState.getInstance().setState('orderWorkingOn', newOrder);
            }
            orderWorkingOn!.ingredients.push(e.detail.button.food);
        }
    }
}
