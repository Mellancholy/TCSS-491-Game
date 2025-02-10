import Button from "./button.js";

export default class StationSwitcher {
    constructor(game, loadStation) {
        Object.assign(this, { game });

        this.orderButton = new Button(game, 102, 636, "./assets/button/Order_Button.JPG", () => loadStation("order"));
        this.riceButton = new Button(game, 318, 636, "./assets/button/Rice_Button.JPG", () => loadStation("rice"));
        this.rollButton = new Button(game, 534, 636, "./assets/button/Roll_Button.JPG", () => loadStation("roll"));
        this.sidesButton = new Button(game, 750, 636, "./assets/button/Side_Button.JPG", () => loadStation("sides"));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    update() {}

    draw(ctx) {}
}