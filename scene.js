export default class Scene {

    constructor(game) {
        if (this.constructor == Scene) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.gameObjects = [];
        this.hiddenObjects = [];
    }

    initalizeScene() {
        // This is where you would add all of the game objects to the scene
    }

    addGameObject(gameObject) {
        if (!this.hiddenObjects.some(obj => obj.id === gameObject.id)) {
            this.gameObjects.push(gameObject);
            this.game.addEntity(gameObject);
        }
    }

    deload() {
        this.gameObjects = this.gameObjects.filter(gameObject => {
            if (gameObject.persistent) {
                // Prevent duplicate hiddenObjects entries
                if (!this.hiddenObjects.some(obj => obj.id === gameObject.id)) {
                    this.hiddenObjects.push(gameObject);
                    console.log("hiding game object: ", gameObject);
                }
                gameObject.hidden = true;
                return false;
            } else {
                console.log("deloading game object: ", gameObject);
                gameObject.deload();
                return false; // Remove non-persistent objects
            }
        });
    }

    restoreHiddenObjects() {
        this.hiddenObjects.forEach(gameObject => {
            gameObject.hidden = false;
            this.gameObjects.push(gameObject);
        });
    }

    // Stub methods since its technically a game object
    draw(ctx) {}
    update() {}
}