import GameObject from "src/gameObject.js";
import { ASSET_MANAGER } from "src/main.js";
import { Order, FILLINGS, WRAP, CONDIMENTS, SIDES } from "./food.js";
import { Button } from "src/button.js";
import GameEngine from "src/gameEngine.js";
import Scene from "src/scene.js";
import { randomIntRange } from "src/util.js";
import GameState from "src/gameState.js";

export default class Customer extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    yDrawOffset: number;
    spritesheet: HTMLImageElement;
    exclamationSprite: HTMLImageElement;
    width: number;
    height: number;
    state: string;
    order: Order | null;
    okButton: Button | undefined;

    constructor(game: GameEngine, x: number, y: number) {
        super(game, 'customer', true);
        this.game = game;
        this.x = x;
        this.y = y;
        this.yDrawOffset = 0;
        this.spritesheet = ASSET_MANAGER.getAsset(this.randomCustomer()) as HTMLImageElement;
        this.exclamationSprite = ASSET_MANAGER.getAsset("./assets/button/exclam.png") as HTMLImageElement;
        this.width = 400;
        this.height = 600;
        this.state = "init"
        this.order = null;
        this.addButton();
        ASSET_MANAGER.playAsset('./assets/sounds/doorchime.mp3');
        console.log("Customer created");
    };

    update() {
        switch (this.state) {
            case "init":
                this.state = "walking";
                let npc = this;
                async function startWalk() {
                    await npc.walkTo(100, 100);
                    npc.state = "waiting";
                }
                startWalk();
                break;
            case "walking":
                break;
            case "waiting":
                break;
            case "order":
                break;
            default:
                break;
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        if(this.game.options.debugging) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.spritesheet, this.x, this.y + this.yDrawOffset, this.width, this.height);
        switch (this.state) {
            case "init":
                break;
            case "walking":
                break;
            case "waiting":
                ctx.drawImage(this.exclamationSprite, this.x + (this.spritesheet.width / 2) - (this.exclamationSprite.width / 2) - 10, this.y - 30, 100, 100);
                break;
            case "order":
                this.drawOrder(ctx);
                break;
            default:
                break;
        }
    };

    drawOrder(ctx: CanvasRenderingContext2D) {
        if (!this.order) return;
        const orderX = 500
        const orderY = 100
        const length = (WRAP.length + 3 + CONDIMENTS.length + 1) * 40
        ctx.fillStyle = "white";
        ctx.fillRect(orderX, orderY, 200, length);
        ctx.fillStyle = "black";
        ctx.strokeRect(orderX, orderY, 200, length);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        let yOffset = orderY
        this.order.ingredients.forEach((ingredient) => {
            if (ingredient.name === "rice" || ingredient.name === "nori") {
                ctx.fillText(ingredient.name, 600, orderY + yOffset);
            } else {
                const sprite = ASSET_MANAGER.getAsset(ingredient.img) as HTMLImageElement;
                ctx.drawImage(sprite, 600 - sprite.width / 2, orderY + yOffset); // Adjust for sprite height
                yOffset += sprite.height;
            }
            yOffset += 30; // Increment placement upwards as index increases
        });
        this.order.sides.forEach((side) => {
            ctx.fillText(side.name, 600, 100 + yOffset);
            yOffset += 30; // Increment placement upwards as index increases
        })
    }

    async walkTo(x: number, y: number) {
        let npc: Customer = this;
        return new Promise((resolve) => {
            let t = 0;
            function step() {
                const speed = 5;
                const xDiff = Math.abs(npc.x - x);
                const yDiff = Math.abs(npc.y - y);
                const dx = x - npc.x;
                const dy = y - npc.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / length;
                const ny = dy / length;
                const xChange = Math.min(nx * speed, xDiff);
                const yChange = Math.min(ny * speed, yDiff);
                if (npc.x !== x) {
                    npc.x += xChange
                }
                if (npc.x !== x) {
                    npc.y += yChange
                }
                if (npc.x === x && npc.y === y) {
                    resolve(true);
                    return;
                }

                npc.yDrawOffset = (Math.sin((Math.PI / 4) * t) * 10);
                requestAnimationFrame(step);
                t += 0.1;
            }
            step()
        })
        // let intervalID = setInterval(() => {
        //     if(this.y === y) {
        //         clearInterval(intervalID);
        //         this.hasWalked = true;
        //     }
        //     if (this.y < y) {
        //         this.y += 5;
        //     }
        //     if (this.y > y) {
        //         this.y -= 5;
        //     }
        // }, 20);
    }

    displayOrder() {
        this.order = this.randomOrder();
    }

    addButton() {
        console.log("Adding button");
        if(!this.game.currentScene) {
            throw new Error("No current scene found");
        }
        if(!this.game.currentScene.addPersistantGameObject("okButton")) {
            this.okButton = Button.rectButton(this.game, 750, 400, 100, 50, () => {
                if(!this.okButton) return;
                console.log("OK button pressed");
                console.log(this.okButton);
                this.okButton.hidden = true;
                GameState.getInstance().addOrder(this, this.order!);
            }, "OK")
            this.okButton.persistent = true;
            this.okButton.id = "okButton";
            this.okButton.hidden = true;
            this.game.registerPersistentGameObject("okButton", this.okButton)
            if (this.game.currentScene) this.game.currentScene.addGameObject(this.okButton);
        }
        
    }

    randomOrder() {
        // Helper function to get random elements from an array
        function getRandomElements(array: any[], count: number) {
            let shuffled = array.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
            return shuffled.slice(0, count); // Pick the first 'count' elements
        }

        const numWrap = randomIntRange(2, WRAP.length);
        const numIngredients = randomIntRange(1, 3);
        const numSides = randomIntRange(0, 1);

        const selectedWraps = getRandomElements(WRAP, numWrap);
        const selectedIngredients = getRandomElements(FILLINGS, numIngredients);
        const selectedCondiments = getRandomElements(CONDIMENTS, 1);
        const selectedSides = getRandomElements(SIDES, numSides);

        return new Order(
            [...selectedWraps, ...selectedIngredients],
            [ ...selectedSides], selectedCondiments[0]
        );
    }

    randomCustomer() {
        const customerNum = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
        return "./assets/characters/Customer_" + customerNum + ".png";
    }

    onMouseDown(e: MouseEvent): void {
        if (this.state === "waiting") {
            if (e.x > this.x && e.x < this.x + this.width && e.y > this.y && e.y < this.y + this.height) {
                this.displayOrder();
                this.okButton!.hidden = false;
                this.state = "order";
            }
        }
    }

}