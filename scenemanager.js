class SceneManager {
    constructor(game){
        this.game = game;

        //this.loadStation(orderStation, false)
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
            
        }
    };

    update() {

    };

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/buttons/Order_Button.JPG", 0, 0));
    };

}