import GameObject from '../../gameObject.js';
import Fly from './fly.js';

export default class FlySpawner extends GameObject {
    constructor(game, numFlies, spawnInterval) {
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
        clearInterval(this.intervalID);
    };
}