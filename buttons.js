class Buttons {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y })

        this.orderButton = ASSET_MANAGER.getAsset("./sprites/button/Order_Button.JPG");
        this.riceButton = ASSET_MANAGER.getAsset("./sprites/button/Rice_Button.JPG");
        this.rollButton = ASSET_MANAGER.getAsset("./sprites/button/Roll_Button.JPG");
        this.sidesButton = ASSET_MANAGER.getAsset("./sprites/button/Side_Button.JPG");
    }

    update() {
        
    }

    draw(ctx) {
        ctx.drawImage(this.orderButton, 102, 636);
        ctx.drawImage(this.riceButton, 318, 636);
        ctx.drawImage(this.rollButton, 534, 636);
        ctx.drawImage(this.sidesButton, 750, 636);
    }
}