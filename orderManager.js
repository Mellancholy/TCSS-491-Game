export default class OrderManager {
    constructor(game) {
        this.game = game;
        this.activeOrders = [];
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

    update() {};
    draw(ctx) {};
}
    