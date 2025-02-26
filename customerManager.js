export default class customerManager {
    constructor(game) {
        this.game = game;
        this.customers = [];
        this.currentCustomer = null;
        this.isComplete = false;
    }

    addCustomer(customer) {
        this.customers.push(customer);
    }

    getCustomers() {
        return this.customers;
    }

    completeCustomer() {
        this.isComplete = true;
    }

    update() {};
    draw(ctx) {};
}