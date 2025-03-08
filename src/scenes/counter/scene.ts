import  Background  from "src/background.js";
import Customer from './customer.js';
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { ASSET_MANAGER } from "src/main.js";
import GameObject from "src/gameObject.js";
import GameState from "src/gameState.js";

export class CounterScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
    };

    initalizeScene() { 
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Background.png"));
        if(!this.addPersistantGameObject("customer")) {
            console.log("Did not find customer");
            this.addGameObject(new Customer(this.game, 500, 25));
        }
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Foreground.png")); 
        const customer = this.game.getPersistentGameObject("customer") as Customer;
        const orderWorkingOn = GameState.getInstance().getState('orderWorkingOn');
        console.log(orderWorkingOn)
        if (orderWorkingOn && orderWorkingOn.completed) {
            console.log("Adding rating handler")
            this.addGameObject(new RatingHandler(this.game, 500, 25, customer));
        }
    
    }
}

class RatingHandler extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    rating: number;
    customer: Customer;

    constructor(game: GameEngine, x: number, y: number, customer: Customer) {
        super(game, 'rating');
        this.game = game;
        this.x = x;
        this.y = y;
        this.rating = 0;
        this.customer = customer;
    }

    update(): void {
        //Call this when the customer has rated to reset the order
        //this.state.orderWorkingOn = new Order([], [], null);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = "72px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("...", this.customer.x + (this.customer.spritesheet.width / 2), this.customer.y + 60);
    }
}
