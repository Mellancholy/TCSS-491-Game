import GameEngine from "./gameEngine";
import GameObject from "./gameObject";

export default class Scene {
    game: GameEngine;
    gameObjects: Array<GameObject>;

    constructor(game: GameEngine) {
        if (this.constructor == Scene) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.gameObjects = [];
    }

    initalizeScene() { 
        // This is where you would add all of the game objects to the scene
    }

    addGameObject(gameObject: GameObject) {
        console.log(this)
        this.gameObjects.push(gameObject);
        this.game.addEntity(gameObject);
    }

    addPersistantGameObject(id: string) {
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
    draw(ctx: CanvasRenderingContext2D) {}
    update() {}
}