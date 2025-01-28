class OrderStationBg {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");
    };

    update() {

    };

    draw(ctx) {
        console.log("bg drawn");
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}

class RiceStationBg {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Rice_Background.JPG");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}

class RollStationBg {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Roll_Background.JPG");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}

class SidesStationBg {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/backgrounds/Sides_Background.JPG");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
}