export default class GameObject { 
    constructor(game, id, persistent = false) {
        if (this.constructor == GameObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.removeFromWorld = false;
        Object.assign(this, {
            game, id, persistent, removeFromWorld: false
        })

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

    draw(ctx) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    deload() {
        this.removeFromWorld = true;
    }

    restore() {
        this.removeFromWorld = false;
    }
    

    onMouseDown(e) {

    }

    onMouseUp(e) {

    }
}