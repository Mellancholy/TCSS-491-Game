import Button from "./button.js";

export default class StationSwitcher {
    constructor(game, loadStation) {
        Object.assign(this, { game });

        this.orderButton = new Button(game, 102, 694, "./assets/button/Order_Button.JPG", () => loadStation("order"));
        this.riceButton = new Button(game, 318, 694, "./assets/button/Rice_Button.JPG", () => loadStation("burn"));
        this.rollButton = new Button(game, 534, 694, "./assets/button/Roll_Button.JPG", () => loadStation("roll"));
        this.sidesButton = new Button(game, 750, 694, "./assets/button/Side_Button.JPG", () => loadStation("sides"));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    update() {}

    draw(ctx) {}
}