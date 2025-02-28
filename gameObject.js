export default class GameObject {
    constructor(game, id, persistent = false) {
        if (this.constructor == GameObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;

        this.id = id;
        this.persistent = persistent;

        this.removeFromWorld = false;
        this.hidden = false;
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    draw(ctx) {
        throw new Error("Method 'draw()' must be implemented.");
    }

    deload() {
        if (!this.persistent) {
            this.removeFromWorld = true;
        }
    }
    

    onMouseDown(e) {

    }

    onMouseUp(e) {

    }
}