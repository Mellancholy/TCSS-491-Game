import  Background  from "src/background.js";
import Customer from './customer.js';
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { ASSET_MANAGER } from "src/main.js";
import GameObject from "src/gameObject.js";

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
        const customer = this.game.getPersistentGameObject("customer")
        if (customer && customer.order.completed) {
            this.addGameObject(new RatingHandler(this.game, 500, 25, customer));
        }
    
    }
}

class RatingHandler extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    rating: number;
    customer: Customer | undefined;

    constructor(game: GameEngine, x: number, y: number, customer: Customer) {
        super(game, 'rating');
        this.game = game;
        this.x = x;
        this.y = y;
        this.rating = 0;
        this.customer = customer;
    }

    update(): void {
        if (this.customer && this.customer.order.completed) {
            
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        
    }
}
