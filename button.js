class Button {
    constructor(game, x, y, image, onClick) {
        Object.assign(this, { game, x, y, onClick });
        this.image = ASSET_MANAGER.getAsset(image);
    }

    update() {
        if(this.game.click) {
            if (this.game.click.x > this.x && this.game.click.x < this.x + this.image.width &&
                this.game.click.y > this.y && this.game.click.y < this.y + this.image.height) {
                    this.game.click = null;
                    this.onClick();
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

