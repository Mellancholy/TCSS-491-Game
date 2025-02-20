export default class GameObject {
    constructor(game) {
        if (this.constructor == GameObject) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.game = game;
        this.removeFromWorld = false;
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

    onMouseDown(e) {

    }

    onMouseUp(e) {

    }
}