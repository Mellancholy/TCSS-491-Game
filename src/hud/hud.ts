import { Button } from "../button.js";
import GameEngine from "../gameEngine.js";

export default class HUD {
    game: GameEngine;
    state: string;
    orderButton: Button;
    riceButton: Button;
    rollButton: Button;
    sidesButton: Button;

    constructor(game: GameEngine) {
        this.game = game;
        this.state = "main";

        this.orderButton = Button.imageButton(game, 102, 694, "./assets/button/Order_Button.JPG", () => this.loadSceneCallback("order"));
        this.riceButton = Button.imageButton(game, 318, 694, "./assets/button/Rice_Button.JPG", () => this.loadSceneCallback("rice"));
        this.rollButton = Button.imageButton(game, 534, 694, "./assets/button/Roll_Button.JPG", () => this.loadSceneCallback("roll"));
        this.sidesButton = Button.imageButton(game, 750, 694, "./assets/button/Side_Button.JPG", () => this.loadSceneCallback("sides"));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    loadSceneCallback(scene: string) {
        if(!this.game.sceneManager) {
            throw new Error("SceneManager is not initialized");
        }
        this.game.sceneManager.loadScene(scene);
    }

    update() {
        switch(this.state) {
            case "main":
                this.orderButton.hidden = false;
                this.riceButton.hidden = false;
                this.rollButton.hidden = false;
                this.sidesButton.hidden = false;
                break;
            case "hidden":
                this.orderButton.hidden = true;
                this.riceButton.hidden = true;
                this.rollButton.hidden = true;
                this.sidesButton.hidden = true;
                break;
            default:
                console.warn(`Unknown state: ${this.state}`);
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        
    }
}