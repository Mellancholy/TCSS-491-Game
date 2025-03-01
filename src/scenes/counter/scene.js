
import Scene from 'src/scene.js';
import  Background  from "src/background.js";
import GameObject from 'src/gameObject.js'; 
import { ASSET_MANAGER, customerManage, orderManage } from "src/main.js";
import Customer from './customer.js'; 
import { Button } from "src/button.js";

export class CounterScene extends Scene {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });
    };

    initalizeScene() { 
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Background.png"));
        if(!this.addPersistantGameObject("customer")) {
            console.log("Did not find customer");
            this.addGameObject(new Customer(this.game, this.scene, 100, 200));
        }
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Foreground.png")); 
    
    }
}
