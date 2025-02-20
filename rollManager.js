export default class RollManager {
    constructor(game) {
        this.game = game;
        this.activeRolls = [];
    }

    addRoll(roll) {
        this.activeRolls.push(roll);
    }

    removeRoll(roll) {
        this.activeRolls = this.activeRolls.filter(r => r !== roll);
    }

    getRolls() {
        return this.activeRolls;
    }

    update() {};
    draw(ctx) {};
}