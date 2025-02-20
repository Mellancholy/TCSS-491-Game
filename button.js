import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";

export class Button extends GameObject {
    constructor(game, x, y, onClick) {
        super(game);
        Object.assign(this, { game, x, y, onClick });
    }

    static imageButton(game, x, y, image, onClick) {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { image: ASSET_MANAGER.getAsset(image) });
        return button;
    }

    static rectButton(game, x, y, w, h, onClick) {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { w, h, bgColor: "gray" });
        return button;
    }

    update() {
    }

    onMouseDown(e) {
        if(this.image) {
            if (e.offsetX > this.x && e.offsetX < this.x + this.image.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.image.height) {
                    this.onClick();
            }
        } else {
            if (e.offsetX > this.x && e.offsetX < this.x + this.w &&
                e.offsetY > this.y && e.offsetY < this.y + this.h) {
                    this.onClick();
            }
        }
    }

    draw(ctx) {
        if(this.image) {
            ctx.drawImage(this.image, this.x, this.y);
        } else {
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
}

export class DnDButton extends GameObject {
    constructor(game, x, y, onClick) {
        super(game);
        Object.assign(this, { game, x, y, onClick });
        this.dragging = false;
    }

    static imageButton(game, x, y, image, onClick) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { image: ASSET_MANAGER.getAsset(image) });
        return dnd;
    }

    static rectButton(game, x, y, w, h, color, onClick) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { w, h, bgColor: color });
        return dnd;
    }


    update() {
        
    }

    draw(ctx) {
        if(this.image) {
            if(this.dragging) {
                ctx.drawImage(this.image, this.game.mouse.x - this.image.width / 2, this.game.mouse.y - this.image.height / 2);
            } else {
                //console.log("drawing image", this.image, this.x, this.y);
                ctx.drawImage(this.image, this.x, this.y);
            }
            
        } else {
            if(this.dragging) {
                ctx.fillStyle = this.bgColor;
                ctx.fillRect(this.game.mouse.x - this.w / 2, this.game.mouse.y - this.h / 2, this.w, this.h);
            } else {
                ctx.fillStyle = this.bgColor;
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y, this.w, this.h);
            }
            
        }
    }

    onMouseDown(e) {
        console.log("mouse down dnd button");
        if(this.image) {
            if (e.offsetX > this.x && e.offsetX < this.x + this.image.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.image.height) {
                    this.dragging = true;
                    this.onClick();
            }
        } else {
            if (e.offsetX > this.x && e.offsetX < this.x + this.w &&
                e.offsetY > this.y && e.offsetY < this.y + this.h) {
                    this.dragging = true;
                    this.onClick();
            }
        }
    }

    onMouseUp(e) {
        if(this.dragging) {
            this.dragging = false;
            const event = new CustomEvent("dndDrop",
                {
                    detail: {
                        x: e.offsetX,
                        y: e.offsetY,
                        button: this
                    }
                }
            );
            document.body.dispatchEvent(event);
        }
        
    }

}
