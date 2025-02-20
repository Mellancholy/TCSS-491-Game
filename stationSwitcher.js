import { Button } from "./button.js";

export default class StationSwitcher {
    constructor(game, loadStation) {
        Object.assign(this, { game });

        this.orderButton = Button.imageButton(game, 102, 636, "./assets/button/Order_Button.JPG", () => loadStation("order"));
        this.riceButton = Button.imageButton(game, 318, 636, "./assets/button/Rice_Button.JPG", () => loadStation("rice"));
        this.rollButton = Button.imageButton(game, 534, 636, "./assets/button/Roll_Button.JPG", () => loadStation("roll"));
        this.sidesButton = Button.imageButton(game, 750, 636, "./assets/button/Side_Button.JPG", () => loadStation("sides"));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    update() {}

    draw(ctx) {}
}