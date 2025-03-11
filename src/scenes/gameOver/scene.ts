import { ASSET_MANAGER } from "src/main.js";
import  Background  from "src/background.js";
import { Button } from "src/button.js";
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { sceneManage } from "src/main.js";
import GameState from "src/gameState";
import GameObject from "src/gameObject";

export class GameOverScene extends Scene {
    game: GameEngine;
    x: number;
    y: number;

    constructor(game: GameEngine) { 
        super(game);
        this.game = game;
        this.x = 0;
        this.y = 0;
    };

    initalizeScene() { 
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Title_Background.png"));
        this.addGameObject(new Score(this.game));
    }

}

class Score extends GameObject {
    
    game: GameEngine;

    constructor(game: GameEngine) {
        super(game);
        this.game = game;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const money = GameState.getInstance().getState("money");
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        const centerX = 512
        const y = 400
        ctx.fillText("Game Over", centerX, y);
        ctx.fillText("Score: " + money, centerX, y + 50);
        ctx.fillText("Thank you for playing!", centerX, y + 100);
        ctx.fillText("Created by Christina Situ, Claire Nguyen, Melissa Harvey, & Quienten Miller", centerX, y + 150);
    }
}