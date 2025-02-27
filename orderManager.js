// import { WRAP, CONDIMENTS } from "./food.js";
import { Button } from "../../button.js";
export default class OrderManager {
    constructor(game) {
        this.game = game;
        this.activeOrders = [];
        this.showOrder = false;
        this.orderButton = Button.rectButton(this.game, 150, 0, 200, 50, () => {
            this.showOrder = !this.showOrder;
            console.log(this.showOrder);
        }, "ORDERS") 
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
        console.log(this.activeOrders);
    };
    draw(ctx) {
        if (this.showOrder && this.activeOrders.length > 0) {
            const length = 8 * 40
            ctx.fillStyle = "white";
            ctx.fillRect(150, 50, 200, length);
            ctx.fillStyle = "black";
            ctx.strokeRect(150, 50, 200, length);
        }
        
        
    };
}  
    