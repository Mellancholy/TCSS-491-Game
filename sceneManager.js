import { WashThatRiceScene } from "./scenes/washThatRice/scene.js";
import { DontBurnRiceScene } from "./scenes/dontBurnRice/scene.js";
import { FillThePotScene } from "./scenes/fillThePot/scene.js";
import SwatTheFliesScene from "./scenes/swatTheFlies/scene.js";
import { CounterScene } from "./scenes/counter/scene.js";
import { RiceStationScene } from "./scenes/riceStation/scene.js";
import { RiceAssemblyScene } from "./scenes/assembly/scene.js";
import { SidesAssemblyScene } from "./scenes/sides/scene.js";

export default class SceneManager {
    constructor(game){
        this.game = game;
        this.scenes = {};
        this.currentScene = null;

        this.registerScene("order", new CounterScene(this.game, 0, 0));       
        this.registerScene("rice", new RiceStationScene(this.game, 0, 0));        
        this.registerScene("roll", new RiceAssemblyScene(this.game, 0, 0));       
        this.registerScene("sides", new SidesAssemblyScene(this.game, 0, 0));        

        this.registerScene("burn", new DontBurnRiceScene(this.game, 0, 0));
        this.registerScene("fill", new FillThePotScene(this.game, 0, 0));
        this.registerScene("wash", new WashThatRiceScene(this.game, 0, 0));

        this.loadScene("rolls");
        //this.onDeload = null;
    };

    registerScene(id, scene) {
        //console.log("registering scene: " + id);
        this.scenes[id] = scene;
    }

    loadScene(scene) {
        if(this.currentScene === scene) return;
        if(!this.scenes[scene]) {
            //console.log("error: scene not found: " + scene);
            return;
        }

        if(this.currentScene) {
            //console.log("deloading scene: " + this.currentScene);
            this.scenes[this.currentScene].deload();
        }

        //console.log("loading scene: " + scene);
        this.currentScene = scene;
        this.game.currentScene = this.scenes[scene];
        
        this.scenes[scene].initalizeScene();
    };

    update() {};
    draw(ctx) {};

}

