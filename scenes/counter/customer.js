import GameObject from "../../gameObject.js";
import { ASSET_MANAGER, orderManage } from "../../main.js";
import { Order, INGREDIENTS, WRAP, CONDIMENTS, SIDES } from "./food.js";

export default class Customer extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/characters/dummy.png");
        this.width = 400;
        this.height = 600;
        this.order = null;
        this.showOrder = false;
        this.hasWalked = false;
        Object.assign(this, { game, x, y });
    };

    update() {
        if (!this.hasWalked) {
            this.walkTo(100);
        } else {
            if (!this.showOrder) {
                this.displayOrder();
            }
        }

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
        if(this.showOrder) {
            const length = this.order.ingredients.length * 75
            console.log(this.order);
            ctx.fillStyle = "white";
            ctx.fillRect(500, 100, 200, length);
            ctx.fillStyle = "black";
            ctx.strokeRect(500, 100, 200, length);
            const placement = length + 95;
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            for (let i = 0; i < this.order.ingredients.length + this.order.sides.length; i++) {
                let yOffset = placement - i * 30; // Increment placement upwards as index increases
                if (i < this.order.ingredients.length) {
                    if (this.order.ingredients[i].type === "rice" || this.order.ingredients[i].type === "nori") {
                        ctx.fillText(this.order.ingredients[i].type, 600, yOffset);
                    } else {
                        const sprite = ASSET_MANAGER.getAsset(this.order.ingredients[i].img);
                        ctx.drawImage(sprite, 600 - sprite.width / 2, yOffset - sprite.height); // Adjust for sprite height
                    }
                } else if (this.order.sides.length > 0) {
                    ctx.fillText(this.order.sides[i - this.order.ingredients.length].type, 600, yOffset);
                }
            }
        }
    };

    walkTo(y) {
        let intervalID = setInterval(() => {
            if(this.y === y) {
                clearInterval(intervalID);
                this.hasWalked = true;
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
    }

    randomOrder() {
        // Helper function to get random elements from an array
        function getRandomElements(array, count) {
            let shuffled = array.slice().sort(() => 0.5 - Math.random()); // Shuffle the array
            return shuffled.slice(0, count); // Pick the first 'count' elements
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const numWrap = getRandomInt(1, WRAP.length);
        const numIngredients = getRandomInt(1, 3);
        const numCondiments = getRandomInt(0, CONDIMENTS.length);
        const numSides = getRandomInt(0, 1);

        const selectedWraps = getRandomElements(WRAP, numWrap);
        const selectedIngredients = getRandomElements(INGREDIENTS, numIngredients);
        const selectedCondiments = getRandomElements(CONDIMENTS, numCondiments);
        const selectedSides = getRandomElements(SIDES, numSides);

        return new Order(
            [...selectedWraps, ...selectedIngredients],
            [...selectedCondiments, ...selectedSides]
        );
    }

}