export default class RollManager {
    constructor(game) {
        this.game = game;
        this.activeIngredients = [];
    }

    addIngredient(ingredient) {
        this.activeIngredients.push(ingredient);
        console.log(ingredient);
    }

    getRolls() {
        return this.activeIngredients;
    }

    update() {};
    draw(ctx) {};
}