import GameObject from 'src/gameObject.js';
import Fly from './fly.js';
import GameEngine from 'src/gameEngine.js';

export default class FlySpawner extends GameObject {
    game: GameEngine;
    numFlies: number;
    spawnInterval: number;
    currentFlies: number;
    intervalID: NodeJS.Timeout | null;
    
    constructor(game: GameEngine, numFlies: number, spawnInterval: number) {
        super(game);
        this.game = game;
        this.numFlies = numFlies;
        this.spawnInterval = spawnInterval;
        this.currentFlies = 0;
        this.intervalID = null;
        this.startSpawning();
    };

    startSpawning() {
        this.intervalID = setInterval(() => {
            if (this.currentFlies < this.numFlies) {
                this.spawnFlies()
            }
        }, this.spawnInterval);
    };

    spawnFlies() {
        let fly = new Fly(this.game);
        this.game.addEntity(fly);
        this.currentFlies++;

        fly.isSquashed = () => {
            this.currentFlies--;
        }
    };

    update() {

    };

    draw() {

    };

    deload() {
        super.deload();
        if(this.intervalID) clearInterval(this.intervalID);
    };
}