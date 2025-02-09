export default class Scene {

    constructor(game) {
        if (this.constructor == Scene) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.gameObjects = [];
        //this.initalizeScene();
    }

    initalizeScene() {
        // This is where you would add all of the game objects to the scene
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
        this.game.addEntity(gameObject);
    }

    deload() {
        this.gameObjects.forEach(gameObject => {
            console.log("deloading game object: ");
            console.log(gameObject);
            gameObject.deload();
        })
        this.gameObjects = []
    }

    // Stub methods since its technically a game object
    draw(ctx) {}
    update() {}
}