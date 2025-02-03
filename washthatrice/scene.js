const WIDTH = 1024
const HEIGHT = 768

const POT_RADIUS = 250

class WashThatRiceBg {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");

        this.entities = []

        this.addEntities()
    };

    addEntity(entity) {
        this.entities.push(entity);
        this.game.addEntity(entity);
        console.log("added entity", entity)
    }

    addEntities() {
        this.addEntity(new ProgressBar(this.game, 0, HEIGHT - 20, 1024, 20));
	
        this.addEntity(new PotTop(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        
        let amountOfGrains = 2;
        for(let distance = 0; distance < POT_RADIUS; distance += 20) {
            for(let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / amountOfGrains) {
                let rice = new RiceGrain(this.game, angle, distance, (WIDTH / 2), (HEIGHT / 2));
                this.addEntity(rice);
            }
            amountOfGrains += 10;
        }
        
        this.addEntity(new PotTopOutside(this.game, (WIDTH / 2), (HEIGHT / 2)));
    
        this.addEntity(new RotateIcon(this.game, (WIDTH / 2), (HEIGHT / 2)));
        
        this.addEntity(new Hand(this.game, 0, 0));
        
        this.addEntity(new Checkmark(this.game, ASSET_MANAGER, (WIDTH / 2), (HEIGHT / 2)));
    }

    deload() {
        console.log("deleting entities")
        this.entities.forEach(entity => {
            //instance.game.removeEntity(entity);
            entity.removeFromWorld = true;
        })
        this.removeFromWorld = true;
        this.entities = []
    }

    update() {

    };

    draw(ctx) {

    };
}

class FillThePot {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");

        this.entities = []

        this.addEntities()
    };

    addEntity(entity) {
        this.entities.push(entity);
        this.game.addEntity(entity);
        console.log("added entity", entity)
    }

    addEntities() {
        let cup = new Cup(this.game);
        this.addEntity(cup);
        this.addEntity(new WaterPitcher(this.game, cup));
    }

    deload() {
        console.log("deleting entities")
        this.entities.forEach(entity => {
            //instance.game.removeEntity(entity);
            entity.removeFromWorld = true;
        })
        this.removeFromWorld = true;
        this.entities = []
    }

    update() {

    };

    draw(ctx) {

    };
}

class DontBurnRice {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Rice_Background.JPG");

        this.entities = []

        this.addEntities()
    };

    addEntity(entity) {
        this.entities.push(entity);
        this.game.addEntity(entity);
        console.log("added entity", entity)
    }

    addEntities() {
        let timeBar = new TimerBar(this.game, 10);
        let riceCooker = new RiceCooker(this.game)
        this.addEntity(riceCooker);
        this.addEntity(timeBar);
        
    }

    deload() {
        console.log("deleting entities")
        this.entities.forEach(entity => {
            //instance.game.removeEntity(entity);
            entity.removeFromWorld = true;
        })
        this.removeFromWorld = true;
        this.entities = []
    }

    update() {

    };

    draw(ctx) {

    };
}