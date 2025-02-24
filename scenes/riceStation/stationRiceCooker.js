import GameObject from "../../gameObject.js";
import { ASSET_MANAGER } from "../../main.js";
import { sceneManage, orderManage, rollManage } from '../../main.js';


export default class StationRiceCooker extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;

        this.riceX = 10;
        this.riceY = 10;
        this.amount = 5;

        this.noriX = 10;
        this.noriY = 10;

        this.cookerClicked = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.order = orderManage.getOrders()[0];
        this.roll = null;

        this.noriClicked = false;
    }

    update() {
        if (this.cookerClicked) {
            if (this.amount == 0) {
                this.beginMinigame();
                this.amount = 5;
            } else {
                this.riceX = this.game.mouse.x - this.offsetX;
                this.riceY = this.game.mouse.y - this.offsetY;
            }
        }
    }

    draw(ctx) {
        if (this.amount <= 10 && this.amount > 5) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Full.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else if (this.amount <= 5 && this.amount > 1) {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Low.png");
            ctx.drawImage(sprite, this.x, this.y);
        } else {
            const sprite = ASSET_MANAGER.getAsset("./assets/objects/RiceCooker_Empty.png");
            ctx.drawImage(sprite, this.x, this.y);
        }

        if (this.cookerClicked) {
            const riceSprite = ASSET_MANAGER.getAsset("./assets/objects/Rice_Cooked.png");
            ctx.drawImage(riceSprite, this.riceX, this.riceY);
        }
    }

    onMouseDown(e) {
        this.createRiceAndDrag(this.game.mouse.x, this.game.mouse.y);
    }
    
    onMouseUp(e) {
        this.stopDragging();
    }

    
    // Spawn in rice and 
    createRiceAndDrag(mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= this.x + 512 && mouseY >= this.y && mouseY <= this.y + 400) {
            this.cookerClicked = true;
            this.offsetX = mouseX - this.x;
            this.offsetY = mouseY - this.y;
            this.amount--;
            console.log(this.amount);
            this.game.currentDraggedItem = this;
        }
    };

    // Stop dragging when mouse is released
    stopDragging() {
        this.cookerClicked = false;
        this.game.currentDraggedItem = null;
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