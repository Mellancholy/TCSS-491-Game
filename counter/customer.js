import GameObject from "../gameObject.js";
import { ASSET_MANAGER } from "../main.js";
import { Order, CALIFORNIA_ROLL, SPICY_TUNA_ROLL, ALASKAN_ROLL, WASABI, GINGER } from "./food.js";

export default class Customer extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/dummy.png");
        this.width = 200;
        this.height = 200;
        this.order = null;
        this.showOrder = false;
        Object.assign(this, { game, x, y });
        this.walkTo(200, 280, this.displayOrder.bind(this));
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if(this.showOrder) {
            //console.log(this.order);
            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y - 200, 200, 200);
            ctx.fillStyle = "black";
            ctx.strokeRect(this.x, this.y - 200, 200, 200);
            ctx.font = "20px Arial";
            ctx.fillText("Order", this.x, this.y - 200);
            ctx.font = "16px Arial";
            for(let i = 0; i < this.order.ingredients.length; i++) {
                ctx.fillText(this.order.ingredients[i].type, this.x, this.y - 180 + i * 20);
            }
            ctx.font = "20px Arial";
            ctx.fillText("Sides", this.x, this.y - 100);
            ctx.font = "16px Arial";
            for(let i = 0; i < this.order.sides.length; i++) {
                ctx.fillText(this.order.sides[i].type, this.x, this.y - 80 + i * 20);
            }
        }
    };

    async walkTo(x, y, onComplete=() => {}) {
        let intervalID = setInterval(() => {
            if(this.x === x && this.y === y) {
                clearInterval(intervalID);
                onComplete();
            }
            if (this.x < x) {
                this.x += 2;
            }
            if (this.y < y) {
                this.y += 2;
            }
            if (this.x > x) {
                this.x -= 2;
            }
            if (this.y > y) {
                this.y -= 2;
            }
        }, 1000 / 60);
    }

    displayOrder() {
        const order = this.randomOrder();
        this.order = order
        this.showOrder = true;
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