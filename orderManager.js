// import { WRAP, CONDIMENTS } from "./food.js";
import { ASSET_MANAGER } from "../../main.js";
import { Button } from "../../button.js";
export default class OrderManager {
    constructor(game) {
        this.game = game;
        this.activeOrders = [];
        this.showOrder = false;
        this.orderButton = Button.rectButton(this.game, 150, 0, 200, 50, () => {
            this.showOrder = !this.showOrder;
            console.log(this.showOrder)
            console.log(this.activeOrders.length);
        }, "ORDERS") 
        this.orderButton.hidden = false;
    }

    addOrder(order) {
        this.activeOrders.push(order);
    }

    removeOrder(order) {
        this.activeOrders = this.activeOrders.filter(o => o !== order);
    }

    getOrders() {
        return this.activeOrders;
    }   

    getOrderLength () {
        return this.activeOrders.length;
    }

    update() {
    };

    draw(ctx) {
        if (this.showOrder && this.activeOrders.length > 0) {
            console.log("draw method")
            const length = 8 * 40
            ctx.fillStyle = "white";
            ctx.fillRect(150, 50, 200, length);
            ctx.fillStyle = "black";
            ctx.strokeRect(150, 50, 200, length);

            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            const order = this.activeOrders[0];
            
            const placement = length + 95;
            for (let i = 0; i < order.ingredients.length + order.sides.length; i++) {
                let yOffset = placement - i * 30; // Increment placement upwards as index increases
                    if (i < order.ingredients.length) {
                        if (order.ingredients[i].type === "rice" || order.ingredients[i].type === "nori") {
                            ctx.fillText(order.ingredients[i].type, 150, yOffset);
                        } else {
                            const sprite = ASSET_MANAGER.getAsset(order.ingredients[i].img);
                            ctx.drawImage(sprite, 150 - sprite.width / 2, yOffset - sprite.height); // Adjust for sprite height
                        }
                    } else if (order.sides.length > 0) {
                        ctx.fillText(order.sides[i - order.ingredients.length].type, 150, yOffset);
                    }
            }
        }
        
    };
}  
    