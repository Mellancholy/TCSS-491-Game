import Scene from '../../scene.js';
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
        this.addGameObject(new Background(this.game, 0, 0));
        this.addGameObject(new SceneUpdater(this.game, this));
        this.addGameObject(new Foreground(this.game, 0, 0));
    }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Order_Background.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
} 

class Foreground extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Order_Foreground.png");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
} 

class SceneUpdater extends GameObject {
    constructor(game, scene) {
        super(game);
        Object.assign(this, { game , scene });
        this.orderManageButtonExists = false;
    }

    update() {
        if (!this.orderManageButtonExists) {
            this.scene.addGameObject(orderManage.orderButton);
        }
        if (customerManage.customers.length == 0) {
            const newCustomer = new Customer(this.game, this.scene, 100, 200)
            customerManage.addCustomer(newCustomer);
            this.scene.addGameObject(newCustomer);
            this.scene.addGameObject(new Foreground(this.game, 0, 0));
        } else if (customerManage.customers.length == 1){
            
        }

    };

    draw(ctx) {
    
    };
}
