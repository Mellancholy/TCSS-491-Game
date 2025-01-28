class SceneManager {
    constructor(game){
        this.game = game;

        this.loadStation(orderStation, false);
    };

    loadStation(station, transition) {
        if (transition) {
            
        } else {
            if (station.stationType == "order") {
                this.game.addEntity(new OrderStationBg(this.game, 0, 0));
            } else if (station.stationType == "rice") {
                this.game.addEntity(new RiceStationBg(this.game, 0,0));
            } else if (station.stationType == "roll") {
                this.game.addEntity(new RollStationBg(this.game, 0, 0));
            } else if (station.stationType == "side") {
                this.game.addEntity(new SidesStationBg(this.game, 0, 0));
            }

            if (station.buttons) {
                this.game.addEntity(new Buttons(this.game, 0, 0))
            }
            
        }
    };

    update() {
        console.log("SceneManager Update");
        if (this.game.click) {
            if (this.game.click.x >= 102 && this.game.click.x <= 274 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(orderStation);
            }
            if (this.game.click.x >= 318 && this.game.click.x <= 490 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(riceStation);
            }
            if (this.game.click.x >= 534 && this.game.click.x <= 706 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(rollStation);
            }
            if (this.game.click.x >= 750 && this.game.click.x <= 922 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(sideStation);
            }
        }
    };

    draw(ctx) {
        
    };

}