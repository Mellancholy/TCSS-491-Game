import  Background  from "src/background.js";
import Customer from './customer.js';
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { ASSET_MANAGER } from "src/main.js";
import GameObject from "src/gameObject.js";
import GameState from "src/gameState.js";
import Ingredient, { Order, Side } from "./food.js";
import { randomIntRange } from "src/util.js";
import drawTicket from "src/hud/ticket.js";

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
        const foreground = new Background(this.game, "./assets/backgrounds/Order_Foreground.png")
        foreground.zIndex = 101;
        this.addGameObject(foreground); 
        const customer = this.game.getPersistentGameObject("customer") as Customer;
        customer.init();
        const orderWorkingOn = GameState.getInstance().getState('orderWorkingOn');
        console.log(orderWorkingOn)
        if (orderWorkingOn && orderWorkingOn.completed) {
            console.log("Adding rating handler")
            this.addGameObject(new RatingHandler(this.game, 500, 25, customer));
        }
    
    }

    newCustomer() {
        console.log("New Customer");
        const customer = new Customer(this.game, 700, 25)
        customer.addButton();
        this.addGameObject(customer);
        GameState.getInstance().setState('orderWorkingOn', new Order([], [], null));
        GameState.getInstance().setState('orders', []);
    }

    deload() {
        super.deload();
        const customer = this.game.getPersistentGameObject("customer") as Customer;
        if(customer.state === "order") {
            console.log("missed ok button")
            customer.onOkButton();
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
            this.rating = this.calculateRating();
            console.log("Rating: " + this.rating);
        }, 2000);
        setTimeout(() => {
            this.state = "done";
            let money = GameState.getInstance().getState('money');
            const moneyToAdd = (randomIntRange(6, 11) * this.rating);
            GameState.getInstance().setState('money', money + moneyToAdd);
            console.log("Money to add: " + moneyToAdd, this.rating);
            this.game.addEntity(new MoneyAdd(this.game, this.customer.x + (this.customer.spritesheet.width / 2), this.customer.y));
            this.customer.state = "leaving";
            let scene = this.game.currentScene as CounterScene;
            scene.newCustomer();
        }, 3000);
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
                drawTicket(ctx, this.customer.order!, 500, 100);
                drawTicket(ctx, GameState.getInstance().getState('orderWorkingOn')!, 750, 100);
                break;
            case "rating":
                
                if(this.rating >= 90) {
                    ctx.fillStyle = "green";
                } else if(this.rating >= 70) {
                    ctx.fillStyle = "yellow";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillText("%" + (this.rating * 100).toFixed(0), this.customer.x + (this.customer.spritesheet.width / 2), this.customer.y + 60);
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
        return percentCorrect;
    }
}

class MoneyAdd extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    sprite: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number) {
        super(game, "moneyAdd", true);
        this.game = game;
        this.x = x
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.sprite = ASSET_MANAGER.getAsset("./assets/objects/coin_add.png") as HTMLImageElement;
        this.zIndex = 100;
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 3000);
    }

    update(): void {
        this.y -= 2;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

}