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
        this.gameObjects.push(gameObject);
        this.game.addEntity(gameObject);
    }

    deload() {
        this.gameObjects = this.gameObjects.filter(gameObject => {
            if (gameObject.persistent) {
                // Hide persistent objects instead of removing them
                this.hiddenObjects.push(gameObject);
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
        this.hiddenObjects = []; // Clear the hidden objects list after restoring
    }
    
    // Stub methods since its technically a game object
    draw(ctx) {}
    update() {}
}