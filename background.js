class OrderStation {

}

class RiceStation {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y})

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/buttons/");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage();
    };
}

class RollStation {

}

class SideStation {

}