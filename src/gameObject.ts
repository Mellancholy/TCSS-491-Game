import GameEngine from "./gameEngine";

export default class GameObject { 
    game: GameEngine;
    id: string = "";
    persistent: boolean = false;
    removeFromWorld: boolean = false;
    hidden: boolean | undefined = false;
    zIndex: number = 0;
    [key: string]: any;

    constructor(game: GameEngine, id: string = "", persistent: boolean = false) {
        if (this.constructor == GameObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.game = game;
        this.id = id;
        this.persistent = persistent;

        if(persistent) {
            game.registerPersistentGameObject(id, this)
        }
    }

    init() {
        // Initialize the game object
        // This method should be overridden by subclasses
        throw new Error("Method 'init()' must be implemented.");
    }

    loadSharedData() {
        const data = this.game.getSharedDataByKey(this.id)
        for (const key in data) {
            this[key] = data[key];
        }
        this.game.removeSharedDataByKey(this.id);
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    draw(ctx : CanvasRenderingContext2D) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    deload() {
        this.removeFromWorld = true;
    }

    restore() {
        this.removeFromWorld = false;
    }
    

    onMouseDown(e: MouseEvent) {

    }

    onMouseUp(e: MouseEvent) {

    }
}