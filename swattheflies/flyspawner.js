class FlySpawner {
    constructor(game, numFlies, spawnInterval) {
        this.game = game;
        this.numFlies = numFlies;
        this.spawnInterval = spawnInterval;
        this.currentFlies = 0;
        this.startSpawning();
    };

    startSpawning() {
        setInterval(() => {
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
}