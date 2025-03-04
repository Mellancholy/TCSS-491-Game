
import Scene from 'src/scene.js';
import  Background  from "src/background.js";
import Customer from './customer.js';
import GameEngine from 'src/gameEngine.js';

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
    
    }
}
