import GameEngine from "./gameEngine";

export default class customerManager {
    game: GameEngine;
    customers: any[];
    currentCustomer: any;
    isComplete: boolean;

    constructor(game: GameEngine) {
        this.game = game;
        this.customers = [];
        this.currentCustomer = null;
        this.isComplete = false;
    }

    addCustomer(customer: any) {
        this.customers.push(customer);
    }

    getCustomers() {
        return this.customers;
    }

    completeCustomer() {
        this.isComplete = true;
    }

    update() {};
    draw(ctx: CanvasRenderingContext2D) {};
}