import { Button } from "../../button.js";
export default class OrderManager {
    constructor(game) {
        this.game = game;
        this.activeOrders = [];
        this.showOrder = false;
        this.orderButton = Button.rectButton(this.game, 600, 320, 100, 50, () => {
            this.showOrder = true;
        }, "Orders") 
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

    showOrder() {
        
    }

    update() {};
    draw(ctx) {};
}  
    