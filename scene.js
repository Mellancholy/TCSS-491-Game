export default class Scene {

    constructor(game) {
        if (this.constructor == Scene) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.gameObjects = [];
    }

    initalizeScene() { 
        // This is where you would add all of the game objects to the scene
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
        this.game.addEntity(gameObject);
    }

    addPersistantGameObject(id) {
        let obj = this.game.getPersistentGameObject(id);
        if (!obj) {
            return false;
        }
        this.addGameObject(obj);
        return true;
    }

    deload() {
        this.gameObjects.forEach(gameObject => {
            if (gameObject.persistent) {
                return;  
            }
            gameObject.deload();
        })
        this.gameObjects = []
    }

    // Stub methods since its technically a game object
    draw(ctx) {}
    update() {}
}