class SceneManager {
    constructor(game){
        this.game = game;
        this.currentStation = null;

        this.loadStation(orderStation, false);
        this.onDeload = null;
    };

    loadStation(station, transition) {
        if(this.currentStation === station) return;
        if (transition) {
            
        } else {
            if (this.onDeload) {
                this.onDeload();
                this.onDeload = null;
            }

            if (station.stationType == "order") {
                this.game.addEntity(new OrderStationBg(this.game, 0, 0));
                let fillThePot = new FillThePot(this.game, 0, 0);
                this.onDeload = fillThePot.deload.bind(fillThePot);
            } else if (station.stationType == "rice") {
                this.game.addEntity(new RiceStationBg(this.game, 0,0));
                let dontBurnRice = new DontBurnRice(this.game, 10);
                this.onDeload = dontBurnRice.deload.bind(dontBurnRice);
            } else if (station.stationType == "roll") {
                this.game.addEntity(new RollStationBg(this.game, 0, 0));
            } else if (station.stationType == "side") {
                this.game.addEntity(new SidesStationBg(this.game, 0, 0));
                let washThatRiceScene = new WashThatRiceBg(this.game, 0, 0);
                this.game.addEntity(washThatRiceScene);
                this.onDeload = washThatRiceScene.deload.bind(washThatRiceScene);
            }
            
            this.currentStation = station;
        }
    };

    update() {

    };

    draw(ctx) {
        
    };

}