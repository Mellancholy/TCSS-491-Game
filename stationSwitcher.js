import { Button } from "./button.js";

export default class StationSwitcher {
    constructor(game) {
        Object.assign(this, { game });

        this.orderButton = Button.imageButton(game, 102, 694, "./assets/button/Order_Button.JPG", () => this.game.sceneManager.loadScene("order"));
        this.riceButton = Button.imageButton(game, 318, 694, "./assets/button/Rice_Button.JPG", () => this.game.sceneManager.loadScene("rice"));
        this.rollButton = Button.imageButton(game, 534, 694, "./assets/button/Roll_Button.JPG", () => this.game.sceneManager.loadScene("roll"));
        this.sidesButton = Button.imageButton(game, 750, 694, "./assets/button/Side_Button.JPG", () => this.game.sceneManager.loadScene("sides"));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    update() {}

    draw(ctx) {}
}