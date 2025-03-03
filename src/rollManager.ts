import GameEngine from "./gameEngine";

export default class RollManager {
    game: GameEngine;
    activeIngredients: any[];
    isComplete: boolean;

    constructor(game: GameEngine) {
        this.game = game;
        this.activeIngredients = [];
        this.isComplete = false;
    }

    addIngredient(ingredient: any) {
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
    draw(ctx: CanvasRenderingContext2D) {}; 
}