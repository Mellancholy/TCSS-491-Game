export default class Scene {

    constructor(game) {
        if (this.constructor == Scene) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.gameObjects = [];

        // stores persisten object within the scene for later restoration
        this.persistentObjects = [];
    }

    initalizeScene() { 
        // This is where you would add all of the game objects to the scene
    }

    addGameObject(gameObject) {
        // will add a gameObject into scene as long as it is not already store in persistenObjects
        if (!this.persistentObjects.some(obj => obj.id === gameObject.id)) {
            this.gameObjects.push(gameObject);
            this.game.addEntity(gameObject);
        }
    }

    removePersistentObject(id) {
        // Find and remove from persistentObjects
        const index = this.persistentObjects.findIndex(object => object.id === id);
        if (index !== -1) {
            const removedObject = this.persistentObjects.splice(index, 1)[0]; // Remove from persistent list
    
            // Find the same object in gameObjects and mark it for removal
            const gameObjIndex = this.gameObjects.findIndex(obj => obj.id === id);
            if (gameObjIndex !== -1) {
                this.gameObjects[gameObjIndex].removeFromWorld = true; // Flag for removal
                this.gameObjects[gameObjIndex].persistent = false; // Flag for removal
            }
        }
    }
    

    deload() {
        // deloads ALL gameObjects but stores persistent for later restoration
        this.gameObjects = this.gameObjects.filter(gameObject => {
            if (gameObject.persistent) {
                // Store persistent objects for later restoration
                if (!this.persistentObjects.some(obj => obj.id === gameObject.id)) {
                    console.log("hiding game object: ", gameObject);
                    this.persistentObjects.push(gameObject);
                }
            }
            console.log("deloading game object: ", gameObject);
                gameObject.deload();
        });
    }

    restoreHiddenObjects() {
        this.persistentObjects.forEach(gameObject => {
            gameObject.restore();
            this.gameObjects.push(gameObject);
            this.game.addEntity(gameObject);
        });
    }

    // Stub methods since its technically a game object
    draw(ctx) {}
    update() {}
}