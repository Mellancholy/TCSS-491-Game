import { WashThatRiceScene } from "./washThatRice/scene.js";
import { DontBurnRiceScene } from "./dontBurnRice/scene.js";
import { FillThePotScene } from "./fillThePot/scene.js";
import SwatTheFliesScene from "./swatTheFlies/scene.js";
import { CounterScene } from "./counter/scene.js";
import { RiceStationScene } from "./riceStation/scene.js";

export default class SceneManager {
    constructor(game){
        this.game = game;
        this.scenes = {};
        this.currentScene = null;

        this.registerScene("rice", new RiceStationScene(this.game, 0, 0));
        this.registerScene("order", new FillThePotScene(this.game, 0, 0));
        this.registerScene("burn", new DontBurnRiceScene(this.game, 0, 0));
        this.registerScene("roll", new SwatTheFliesScene(this.game, 0, 0));
        this.registerScene("sides", new WashThatRiceScene(this.game, 0, 0));
        this.registerScene("counter", new CounterScene(this.game, 0, 0));

        this.loadStation("rice");
        //this.onDeload = null;
    };

    registerScene(id, scene) {
        console.log("registering scene: " + id);
        this.scenes[id] = scene;
    }

    loadStation(station) {
        if(this.currentScene === station) return;
        if(!this.scenes[station]) {
            console.log("error: scene not found: " + station);
            return;
        }

        if(this.currentScene) {
            console.log("deloading scene: " + this.currentScene);
            this.scenes[this.currentScene].deload();
        }

        console.log("loading scene: " + station);
        this.scenes[station].initalizeScene();
        this.currentScene = station;
    };

    update() {};
    draw(ctx) {};

}