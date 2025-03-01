import { ASSET_MANAGER } from "src/main.js";
import ProgressBar from "./progressBar.js";
import { PotTop, PotTopOutside } from "./pot.js";
import RiceGrain from "./riceGrain.js";
import RotateIcon from "./rotate.js";
import Hand from "./hand.js";
import Checkmark from "./checkmark.js";
import Scene from "src/scene.js";
import GameObject from "src/gameObject.js";
import GameEngine from "src/gameEngine.js";

const WIDTH = 1024
const HEIGHT = 768

const POT_RADIUS = 250

export class WashThatRiceScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;
    spritesheet: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
        this.x = x;
        this.y = y;
    }

    initalizeScene() {
        super.addGameObject(new Background(this.game, 0, 0));

        super.addGameObject(new ProgressBar(this.game, 0, HEIGHT - 20, 1024, 20));
	
        super.addGameObject(new PotTop(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        
        let amountOfGrains = 2;
        for(let distance = 0; distance < POT_RADIUS; distance += 20) {
            for(let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / amountOfGrains) {
                let rice = new RiceGrain(this.game, angle, distance, (WIDTH / 2), (HEIGHT / 2));
                super.addGameObject(rice);
            }
            amountOfGrains += 10;
        }
        
        super.addGameObject(new PotTopOutside(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        super.addGameObject(new RotateIcon(this.game, (WIDTH / 2), (HEIGHT / 2)));
        
        super.addGameObject(new Hand(this.game, 0, 0));
        
        super.addGameObject(new Checkmark(this.game, ASSET_MANAGER, (WIDTH / 2), (HEIGHT / 2)));
    }
}

class Background extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    spritesheet: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.x = x;
        this.y = y;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png");
    };

    update() {
    };

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}


