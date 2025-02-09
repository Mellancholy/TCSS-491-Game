import Button from "./button.js";
import { orderStation, riceStation, rollStation, sideStation } from "./stations.js";

export default class StationSwitcher {
    constructor(game, loadStation) {
        Object.assign(this, { game });

        this.orderButton = new Button(game, 102, 636, "./sprites/button/Order_Button.JPG", () => loadStation(orderStation, false));
        this.riceButton = new Button(game, 318, 636, "./sprites/button/Rice_Button.JPG", () => loadStation(riceStation, false));
        this.rollButton = new Button(game, 534, 636, "./sprites/button/Roll_Button.JPG", () => loadStation(rollStation, false));
        this.sidesButton = new Button(game, 750, 636, "./sprites/button/Side_Button.JPG", () => loadStation(sideStation, false));

        game.addEntity(this.orderButton);
        game.addEntity(this.riceButton);
        game.addEntity(this.rollButton);
        game.addEntity(this.sidesButton);
    }

    update() {
        
    }

    draw(ctx) {
        
    }
}