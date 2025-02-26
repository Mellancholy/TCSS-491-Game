import GameObject from "../../gameObject.js";
import { ASSET_MANAGER, orderManage } from "../../main.js";
import { Order, CALIFORNIA_ROLL, SPICY_TUNA_ROLL, ALASKAN_ROLL, WASABI, GINGER } from "./food.js";

export default class Customer extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/dummy.png");
        this.width = 400;
        this.height = 600;
        this.order = null;
        this.showOrder = true;
        this.hasOrdered = false;
        this.hasMoved = false;
        Object.assign(this, { game, x, y });
        //this.walkTo(100, this.displayOrder.bind(this));
    };

    update() {
        if (!this.hasOrdered && this.showOrder) {
            this.hasMoved = true;   
            this.walkTo(100, this.displayOrder.bind(this));
        }

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if(this.showOrder) {
            const length = this.order.ingredients.length * 75
            console.log(this.order);
            ctx.fillStyle = "white";
            ctx.fillRect(500, 100, 300, length);
            ctx.fillStyle = "black";
            ctx.strokeRect(500, 100, 300, length);
            const placement = length + 95;
            ctx.font = "20px Arial";
            for(let i = this.order.ingredients.length - 1; i > -1; i--) {
                if (this.order.ingredients[i].type === "rice" || this.order.ingredients[i].type === "nori") {
                    ctx.fillText(this.order.ingredients[i].type, 505, placement - i * 30);
                } else {
                    const sprite = ASSET_MANAGER.getAsset(this.order.ingredients[i].img);
                    ctx.drawImage(sprite, 505, placement - i * sprite.height);
                }
            }
            ctx.font = "20px Arial";
            ctx.fillText("Sides", this.x, this.y - 100);
            ctx.font = "16px Arial";
            for(let i = 0; i < this.order.sides.length; i++) {
                ctx.fillText(this.order.sides[i].type, this.x, this.y - 80 + i * 20);
            }
        }
    };

    async walkTo(y, onComplete=() => {}) {
        let intervalID = setInterval(() => {
            if(this.y === y) {
                clearInterval(intervalID);
                onComplete();
            }
            if (this.y < y) {
                this.y += 5;
            }
            if (this.y > y) {
                this.y -= 5;
            }
        }, 1000 / 60);
    }

    displayOrder() {
        this.order = this.randomOrder();
        orderManage.addOrder(this.order);
        this.showOrder = true;
        this.hasOrdered = true;
    }

    randomOrder() {
        const entres = [
            CALIFORNIA_ROLL,
            SPICY_TUNA_ROLL,
            ALASKAN_ROLL
        ];
        const sides = [
            [WASABI, GINGER]
        ];
        return new Order(
            entres[Math.floor(Math.random() * entres.length)],
            sides[Math.floor(Math.random() * sides.length)]
        );
    }
}