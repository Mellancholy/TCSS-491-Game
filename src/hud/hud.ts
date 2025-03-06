import GameObject from "src/gameObject.js";
import { Button } from "../button.js";
import GameEngine from "../gameEngine.js";
import GameState from "src/gameState.js";
import Ingredient, { CONDIMENTS, Order, WRAP } from "src/scenes/counter/food.js";
import { ASSET_MANAGER } from "src/main.js";

export default class HUD extends GameObject {
    game: GameEngine;
    state: string;
    orderButton: Button;
    riceButton: Button;
    rollButton: Button;
    sidesButton: Button;
    trashButton: Button;
    orderDisplay: OrderDisplay;

    constructor(game: GameEngine) {
        super(game)
        this.game = game;
        this.state = "main";

        this.orderButton = Button.imageButton(game, 102, 694, "./assets/button/Order_Button.JPG", () => this.loadSceneCallback("order"));
        this.riceButton = Button.imageButton(game, 318, 694, "./assets/button/Rice_Button.JPG", () => this.loadSceneCallback("rice"));
        this.rollButton = Button.imageButton(game, 534, 694, "./assets/button/Roll_Button.JPG", () => this.loadSceneCallback("roll"));
        this.sidesButton = Button.imageButton(game, 750, 694, "./assets/button/Side_Button.JPG", () => this.loadSceneCallback("sides"));
        this.trashButton = Button.imageButtonWH(game, 940, 694, 64, 64, "./assets/button/trash.png", this.trashFood);

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
        game.addEntity(this.trashButton);

        this.orderDisplay = new OrderDisplay(game);
        game.addEntity(this.orderDisplay);

    }

    loadSceneCallback(scene: string) {
        if (!this.game.sceneManager) {
            throw new Error("SceneManager is not initialized");
        }
        this.game.sceneManager.loadScene(scene);
    }

    update() {
        switch (this.state) {
            case "main":
                this.orderButton.hidden = false;
                this.riceButton.hidden = false;
                this.rollButton.hidden = false;
                this.sidesButton.hidden = false;
                this.trashButton.hidden = false;
                break;
            case "hidden":
                this.orderButton.hidden = true;
                this.riceButton.hidden = true;
                this.rollButton.hidden = true;
                this.sidesButton.hidden = true;
                this.trashButton.hidden = true;
                break;
            default:
                console.warn(`Unknown state: ${this.state}`);
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {

    }

    setState(state: string) {
        this.state = state;
    }

    trashFood() {
        console.log("trash food");
        let newOrder = new Order([], [], null);
        GameState.getInstance().setState('orderWorkingOn', newOrder);
    }
}

class OrderDisplay extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    state: string;

    constructor(game: GameEngine) {
        super(game, "orderDisplay", true);
        this.game = game;
        this.x = 0
        this.y = 0;
        this.width = 1024;
        this.height = 50;
        this.zIndex = 100;
        this.state = "collapsed";
    }

    pointInRect(x: number, y: number) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }

    update() {
        switch (this.game.getHUD().state) {
            case "main":
                if (this.game.mouse && this.pointInRect(this.game.mouse.x, this.game.mouse.y)) {
                    this.state = "expanded";
                } else {
                    this.state = "collapsed";
                }
                break;
            case "hidden":
                break;
            default:
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        switch (this.game.getHUD().state) {
            case "main":
                if (this.game.options.debugging) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                ctx.globalAlpha = 0.5; // Set transparency (0.0 = fully transparent, 1.0 = fully opaque)
                ctx.fillStyle = "gray"; // Fill color
                ctx.fillRect(this.x, this.y, this.width, this.height); // Draw rectangle
                ctx.globalAlpha = 1.0; // Reset transparency
                const orders = GameState.getInstance().getState("orders");
                for (let i = 0; i < orders.length; i++) {
                    const order = orders[i].order;
                    const orderX = this.x + 10 + 210 * i;
                    const orderY = this.y + 10;
                    ctx.fillStyle = "white";
                    ctx.fillRect(orderX, orderY, 200, 20);
                    ctx.fillStyle = "black";
                    ctx.strokeRect(orderX, orderY, 200, 20);
                }
                if (this.state !== "expanded") return;
                for (let i = 0; i < orders.length; i++) {
                    const order = orders[i].order;
                    const orderX = this.x + 10 + 210 * i;
                    const orderY = this.y + 10;
                    const length = (WRAP.length + 3 + CONDIMENTS.length + 1) * 40
                    ctx.fillStyle = "white";
                    ctx.fillRect(orderX, orderY, 200, length);
                    ctx.fillStyle = "black";
                    ctx.strokeRect(orderX, orderY, 200, length);
                    ctx.font = "20px Arial";
                    ctx.textAlign = "center";
                    let yOffset = orderY + 10
                    let centerX = orderX + ((200 * (i + 1)) / 2)
                    order.ingredients.forEach((ingredient: Ingredient) => {
                        if (ingredient.name === "rice" || ingredient.name === "nori") {
                            ctx.fillText(ingredient.name, centerX, orderY + yOffset);
                        } else {
                            const sprite = ASSET_MANAGER.getAsset(ingredient.img) as HTMLImageElement;
                            ctx.drawImage(sprite, centerX - sprite.width / 2, orderY + yOffset); // Adjust for sprite height
                            yOffset += sprite.height;
                        }
                        yOffset += 30; // Increment placement upwards as index increases
                    });
                    order.sides.forEach((side) => {
                        ctx.fillText(side.name, centerX, 100 + yOffset);
                        yOffset += 30; // Increment placement upwards as index increases
                    })
                }
                break;
            case "hidden":
                break;
            default:
                break;
        }
    }
}