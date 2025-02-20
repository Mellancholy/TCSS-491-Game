import { WashThatRiceScene } from "./washThatRice/scene.js";
import { DontBurnRiceScene } from "./dontBurnRice/scene.js";
import { FillThePotScene } from "./fillThePot/scene.js";
import SwatTheFliesScene from "./swatTheFlies/scene.js";
import { CounterScene } from "./counter/scene.js";
import { RiceAssemblyScene } from "./assembly/scene.js";

export default class SceneManager {
    constructor(game){
        this.game = game;
        this.scenes = {};
        this.currentScene = null;

        this.registerScene("order", new FillThePotScene(this.game, 0, 0));
        this.registerScene("rice", new DontBurnRiceScene(this.game, 0, 0));
        this.registerScene("roll", new SwatTheFliesScene(this.game, 0, 0));
        this.registerScene("sides", new WashThatRiceScene(this.game, 0, 0));
        this.registerScene("counter", new CounterScene(this.game, 0, 0));
        this.registerScene("riceAssembly", new RiceAssemblyScene(this.game, 0, 0));

        this.loadScene("riceAssembly");
        //this.onDeload = null;
    };

    registerScene(id, scene) {
        console.log("registering scene: " + id);
        this.scenes[id] = scene;
    }

    loadScene(scene) {
        if(this.currentScene === scene) return;
        if(!this.scenes[scene]) {
            console.log("error: scene not found: " + scene);
            return;
        }

        if(this.currentScene) {
            console.log("deloading scene: " + this.currentScene);
            this.scenes[this.currentScene].deload();
        }

        console.log("loading scene: " + scene);
        this.currentScene = scene;
        this.game.currentScene = this.scenes[scene];
        this.scenes[scene].initalizeScene();
    };

    update() {};
    draw(ctx) {};

}