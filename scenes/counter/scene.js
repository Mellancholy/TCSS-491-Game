
import Scene from '../../scene.js';
import  Background  from "../../background.js";
import GameObject from '../../gameObject.js'; 
import { ASSET_MANAGER, customerManage, orderManage } from "../../main.js";
import Customer from './customer.js'; 
import { Button } from "../../button.js";

export class CounterScene extends Scene {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });
    };

    initalizeScene() { 
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Background.png"));
        this.addGameObject(new Customer(this.game, this.scene, 100, 200));  
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Order_Foreground.png")); 
    
    }
}
