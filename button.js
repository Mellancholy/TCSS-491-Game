import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";

export class Button extends GameObject {
    constructor(game, x, y, onClick) {
        super(game);
        Object.assign(this, { game, x, y, onClick, hidden: false });
    }

    static imageButton(game, x, y, image, onClick) {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { image: ASSET_MANAGER.getAsset(image) });
        return button;
    }

    static rectButton(game, x, y, width, height, onClick, text="") {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { width, height, bgColor: "gray", text });
        return button;
    }

    update() {
    }

    onMouseDown(e) {
        if(this.hidden) return;
        if(this.image) {
            if (e.offsetX > this.x && e.offsetX < this.x + this.image.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.image.height) {
                    this.onClick();
            }
        } else {
            if (e.offsetX > this.x && e.offsetX < this.x + this.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.height) {
                    this.onClick();
            }
        }
    }

    draw(ctx) {
        if(this.hidden) return;
        if(this.image) {
            ctx.drawImage(this.image, this.x, this.y);
        } else {
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "black"
            ctx.font = "36px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.height / 2) + 5)
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

    static transparentImageButton(game, x, y, width, height, image, onClick) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { width, height, image: ASSET_MANAGER.getAsset(image), transparent: true });
        return dnd;
    }

    static rectButton(game, x, y, width, height, color, onClick) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { width, height, bgColor: color });
        return dnd;
    }
    
    static recButImage(game, x, y, width, height, image, onClick) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { width, height, image: ASSET_MANAGER.getAsset(image), transparent: true });
    
        dnd.draw = function (ctx) {
            
            ctx.fillStyle = "lightgray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
    
            
            if (this.image) {
                const imgSize = Math.min(this.width, this.height) * 0.8; 
                ctx.drawImage(this.image, this.x + (this.width - imgSize) / 2, this.y + (this.height - imgSize) / 2, imgSize, imgSize);
            } else {
                console.error(`Image not found for button: ${image}`);
            }
        };
    
        return dnd;
    }

    update() {
        
    }

    draw(ctx) {
        if(this.transparent && !this.dragging) return;
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
                ctx.fillRect(this.game.mouse.x - this.width / 2, this.game.mouse.y - this.height / 2, this.width, this.height);
            } else {
                ctx.fillStyle = this.bgColor;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
            
        }
    }

    onMouseDown(e) {
        console.log("mouse down dnd button");
        if(this.image && !this.transparent) {
            if (e.offsetX > this.x && e.offsetX < this.x + this.image.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.image.height) {
                    this.dragging = true;
                    this.onClick();
            }
        } else {
            if (e.offsetX > this.x && e.offsetX < this.x + this.width &&
                e.offsetY > this.y && e.offsetY < this.y + this.height) {
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
