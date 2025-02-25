export default class RollManager {
    constructor(game) {
        this.game = game;
        this.activeIngredients = [];
        this.isComplete = false;
    }

    addIngredient(ingredient) {
        this.activeIngredients.push(ingredient);
        console.log(ingredient);
    }

    getRolls() {
        return this.activeIngredients;
    }

    completeRoll() {
        this.isComplete = true;
    }

    update() {};
    draw(ctx) {}; 
}