import GameEngine from "./gameEngine.js";
import Scene from "./scene.js";

// Scene Imports
import { TitleScene } from "./scenes/title/scene.js";
import { WashThatRiceScene } from "./scenes/washThatRice/scene.js";
import { DontBurnRiceScene } from "./scenes/dontBurnRice/scene.js";
import { FillThePotScene } from "./scenes/fillThePot/scene.js";
import SwatTheFliesScene from "./scenes/swatTheFlies/scene.js";
import { CounterScene } from "./scenes/counter/scene.js";
import { RiceStationScene } from "./scenes/riceStation/scene.js";
import { RiceAssemblyScene } from "./scenes/assembly/scene.js";
import { SidesAssemblyScene } from "./scenes/sides/scene.js";
import { GameOverScene } from "./scenes/gameOver/scene.js";

export default class SceneManager {
    game: GameEngine;
    scenes: { [key: string]: Scene };
    currentScene: string | null;
    zIndex: number;

    constructor(game: GameEngine){
        this.game = game;
        this.scenes = {};
        this.currentScene = null;
        this.zIndex = -1;

        this.registerScene("title", new TitleScene(this.game, 0, 0));

        this.registerScene("order", new CounterScene(this.game, 0, 0));
        this.registerScene("rice", new RiceStationScene(this.game));
        this.registerScene("roll", new RiceAssemblyScene(this.game));
        this.registerScene("sides", new SidesAssemblyScene(this.game, 0, 0));

        this.registerScene("burn", new DontBurnRiceScene(this.game, 0, 0));
        this.registerScene("fill", new FillThePotScene(this.game, 0, 0));
        this.registerScene("wash", new WashThatRiceScene(this.game, 0, 0));

        this.registerScene("gameOver", new GameOverScene(this.game));

        this.loadScene("title");
        //this.onDeload = null;
    };

    registerScene(id: string, scene: Scene) {
        //console.log("registering scene: " + id);
        this.scenes[id] = scene;
    }

    loadScene(scene: string) {
        if(this.currentScene === scene) return;
        if(!this.scenes[scene]) {
            throw new Error("Scene " + scene + " not found");
        }

        if(this.currentScene) {
            //console.log("deloading scene: " + this.currentScene);
            this.scenes[this.currentScene].deload();
        }

        //console.log("loading scene: " + scene);
        this.currentScene = scene;
        this.game.currentScene = this.scenes[scene];
        
        this.game.getHUD().setState("main");
        this.scenes[scene].initalizeScene();
    };

    update() {};
    draw(ctx: CanvasRenderingContext2D) {};

}

