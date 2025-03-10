import  Background  from "src/background.js";
import Customer from './customer.js';
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { ASSET_MANAGER } from "src/main.js";
import GameObject from "src/gameObject.js";
import GameState from "src/gameState.js";
import Ingredient, { Side } from "./food.js";

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
    state: string;

    constructor(game: GameEngine, x: number, y: number, customer: Customer) {
        super(game, 'rating');
        this.game = game;
        this.x = x;
        this.y = y;
        this.rating = 0;
        this.customer = customer;
        this.state = "judging";
        setTimeout(() => {
            this.state = "rating";
        }, 2000);
    }

    update(): void {
        //Call this when the customer has rated to reset the order
        //this.state.orderWorkingOn = new Order([], [], null);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = "72px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        
        switch(this.state) {
            case "judging":
                ctx.fillText("...", this.customer.x + (this.customer.spritesheet.width / 2), this.customer.y + 60);
                break;
            case "rating":
                this.rating = this.calculateRating();
                if(this.rating >= 90) {
                    ctx.fillStyle = "green";
                } else if(this.rating >= 70) {
                    ctx.fillStyle = "yellow";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText("%" + this.rating, this.customer.x + (this.customer.spritesheet.width / 2), this.customer.y + 60);
            default:
                break;
        }
    }

    calculateRating() {
        let orderMade = GameState.getInstance().getState('orderWorkingOn')!
        let ordered = this.customer.order!;
        const ENTREE_P = 0.8;
        const SIDE_P = 0.2;
        let correctIngredients = 0;
        let totalIngredients = ordered.ingredients.length;

        ordered.ingredients.forEach((ingredient: Ingredient, index: number) => {
            if (orderMade.ingredients[index] === ingredient) {
                correctIngredients++;
            }
        });

        let percentIngredientsCorrect = (correctIngredients / totalIngredients) || 1;
        console.log("Ingredient Score: " + percentIngredientsCorrect);

        let correctSides = 0;
        let totalSides = ordered.sides.length;

        ordered.sides.forEach((side: Side, index: number) => {
            if (orderMade.sides[index] === side) {
                correctSides++;
            }
        });

        let percentSidesCorrect = (correctSides / totalSides) || 1;
        console.log("Side Score: " + percentSidesCorrect);

        let percentCorrect = (percentIngredientsCorrect * ENTREE_P) + (percentSidesCorrect * SIDE_P);
        console.log("Total Score: " + percentCorrect);
        return percentCorrect * 100;
    }
}
