import { ASSET_MANAGER } from "src/main.js";
import  Background  from "src/background.js";
import { Button } from "src/button.js";
import GameEngine from 'src/gameEngine.js';
import Scene from 'src/scene.js';
import { sceneManage } from "src/main.js";

export class TitleScene extends Scene {
    game: GameEngine;
        x: number;
        y: number;
        startButton: Button | undefined;

    constructor(game: GameEngine, x: number, y: number) { 
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
    };

    initalizeScene() { 
        this.addGameObject(new Background(this.game, "./assets/backgrounds/Title_Background.png"));  
        this.startButton = Button.imageButton(this.game, 426, 400, "./assets/button/Start_Button.png", () => {
            ASSET_MANAGER.playBackgroundMusic('./assets/sounds/background_music.mp3');
            sceneManage.loadScene("order");
        })
        this.addGameObject(this.startButton);
        this.game.getHUD().setState("hidden");
    }

}