class Buttons {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y })

        this.orderButton = ASSET_MANAGER.getAsset("./sprites/backgrounds/Order_Background.JPG");
        this.riceButton = ASSET_MANAGER.getAsset("./sprites/backgrounds/Rice_Background.JPG");
        this.rollButton = ASSET_MANAGER.getAsset("./sprites/backgrounds/Roll_Background.JPG");
        this.sidesButton = ASSET_MANAGER.getAsset("./sprites/backgrounds/Side_Background.JPG");
    }

    update() {

    }

    draw(ctx) {
        console.log("Button drawn");
        ctx.drawImage(this.orderButton, 0, 0);
    }
}