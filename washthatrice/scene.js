import { ASSET_MANAGER } from "../main.js";
import ProgressBar from "./progressBar.js";
import { PotTop, PotTopOutside } from "./pot.js";
import RiceGrain from "./riceGrain.js";
import RotateIcon from "./rotate.js";
import Hand from "./hand.js";
import Checkmark from "./checkmark.js";
import Scene from "../scene.js";
import GameObject from "../gameObject.js";

const WIDTH = 1024
const HEIGHT = 768

const POT_RADIUS = 250

export class WashThatRiceScene extends Scene {
    constructor(game, x, y) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");
        Object.assign(this, { game, x, y})
    };

    initalizeScene() {
        this.addGameObject(new Background(this.game, 0, 0));

        this.addGameObject(new ProgressBar(this.game, 0, HEIGHT - 20, 1024, 20));
	
        this.addGameObject(new PotTop(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        
        let amountOfGrains = 2;
        for(let distance = 0; distance < POT_RADIUS; distance += 20) {
            for(let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / amountOfGrains) {
                let rice = new RiceGrain(this.game, angle, distance, (WIDTH / 2), (HEIGHT / 2));
                this.addGameObject(rice);
            }
            amountOfGrains += 10;
        }
        
        this.addGameObject(new PotTopOutside(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        this.addGameObject(new RotateIcon(this.game, (WIDTH / 2), (HEIGHT / 2)));
        
        this.addGameObject(new Hand(this.game, 0, 0));
        
        this.addGameObject(new Checkmark(this.game, ASSET_MANAGER, (WIDTH / 2), (HEIGHT / 2)));
    }
}

class Background extends GameObject {
    constructor(game, x, y) {
        super(game);
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Sides_Background.JPG");
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}


