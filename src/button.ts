import GameObject from "./gameObject.js";
import { ASSET_MANAGER } from "./main.js";
import GameEngine from "./gameEngine.js";

export class Button extends GameObject {
    image: HTMLImageElement | undefined;
    x: number;
    y: number;
    width: any;
    height: any;
    bgColor: any;
    text: string | undefined;
    hidden: boolean;


    constructor(game: GameEngine, x: number, y: number, onClick: () => void) {
        super(game, 'button');
        this.x = x;
        this.y = y;
        this.onClick = onClick;
        this.hidden = false;
        this.zIndex = 90;
    }

    static imageButton(game: GameEngine, x: number, y: number, image: string, onClick: () => void) {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { image: ASSET_MANAGER.getAsset(image) });
        return button;
    }

    static imageButtonWH(game: GameEngine, x: number, y: number, width: number, height: number, image: string, onClick: () => void) {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { width, height, image: ASSET_MANAGER.getAsset(image) });
        return button;
    }

    static rectButton(game: GameEngine, x: number, y: number, width: number, height: number, onClick: () => void, text = "") {
        let button = new Button(game, x, y, onClick);
        Object.assign(button, { width, height, bgColor: "gray", text });
        return button;
    }

    static rectButtonImage(game: GameEngine, x: number, y: number, width: number, height: number, image: string, onClick: { (): void; (): void; }) {
        let dnd = new Button(game, x, y, onClick);
        Object.assign(dnd, { width, height, image: ASSET_MANAGER.getAsset(image), transparent: true });

        dnd.draw = function (ctx) {
            
            ctx.fillStyle = "lightgrey";
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

    onMouseDown(e: MouseEvent) {
        if (this.hidden) return;
        if (this.image) {
            if (e.x > this.x! && e.x < this.x! + this.image.width &&
                e.y > this.y! && e.y < this.y! + this.image.height) {
                this.onClick();
            }
        } else {
            if (e.x > this.x! && e.x < this.x + this.width &&
                e.y > this.y! && e.y < this.y + this.height) {
                this.onClick();
            }
        }
    }
    onClick() {
        throw new Error("Method not implemented.");
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.hidden) return;

        if (this.image && this.width && this.height) {
            if (this.game.mouse && this.game.mouse.x > this.x && this.game.mouse.x < this.x + this.width &&
                this.game.mouse.y > this.y && this.game.mouse.y < this.y + this.height) {
                this.game.canvas.style.cursor = "pointer";
            }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.image) {
            if (this.game.mouse && this.game.mouse.x > this.x && this.game.mouse.x < this.x + this.image.width &&
                this.game.mouse.y > this.y && this.game.mouse.y < this.y + this.image.height) {
                this.game.canvas.style.cursor = "pointer";
            }
            ctx.drawImage(this.image, this.x!, this.y!);
        } else {
            if (this.game.mouse && this.game.mouse.x > this.x && this.game.mouse.x < this.x + this.width &&
                this.game.mouse.y > this.y && this.game.mouse.y < this.y + this.height) {
                this.game.canvas.style.cursor = "pointer";
            }
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(this.x!, this.y!, this.width, this.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x!, this.y!, this.width, this.height);
            ctx.fillStyle = "black"
            ctx.font = "36px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.text!, this.x! + (this.width / 2), this.y! + (this.height / 2) + 5)
        }
    }
}

export class DnDButton extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    onClick: () => void;
    dragging: boolean;
    transparent: boolean | undefined;
    image: any;
    bgColor: any;
    width: number | undefined;
    height: number | undefined;

    constructor(game: GameEngine, x: number, y: number, onClick: () => void) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.onClick = onClick;

        this.dragging = false;
    }

    static imageButton(game: GameEngine, x: number, y: number, image: string, onClick: () => {}) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { image: ASSET_MANAGER.getAsset(image) });
        return dnd;
    }

    static transparentImageButton(game: GameEngine, x: number, y: number, width: number, height: number, image: string, onClick: () => void) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { width, height, image: ASSET_MANAGER.getAsset(image), transparent: true });
        return dnd;
    }

    static rectButton(game: GameEngine, x: number, y: number, width: number, height: number, color: string, onClick: () => void) {
        let dnd = new DnDButton(game, x, y, onClick);
        Object.assign(dnd, { width, height, bgColor: color});
        return dnd;
    }

    update() {

    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.game.options.debugging) {
            ctx.strokeStyle = "blue";
            ctx.strokeRect(this.x, this.y, this.width!, this.height!);
            if (this.image) {
                ctx.strokeStyle = "green";
                //ctx.strokeRect(this.x, this.y, this.image.width, this.image.height);
            }
        }
        if (this.transparent && !this.dragging) return;
        if (this.image) {
            if (this.dragging) {
                ctx.drawImage(this.image, this.game.mouse!.x - this.image.width / 2, this.game.mouse!.y - this.image.height / 2);
            } else {
                //console.log("drawing image", this.image, this.x, this.y);
                ctx.drawImage(this.image, this.x, this.y);
            }

        } else {
            if(this.dragging) {
                ctx.fillStyle = this.bgColor || "gray";
                ctx.fillRect(this.game.mouse!.x - this.width! / 2, this.game.mouse!.y - this.height! / 2, this.width!, this.height!);
            } else {
                ctx.fillStyle = this.bgColor || "gray";
                ctx.fillRect(this.x, this.y, this.width!, this.height!);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y, this.width!, this.height!);
            }

        }
    }

    onMouseDown(e: MouseEvent) {
        if (this.image && !this.transparent) {
            if (e.x > this.x && e.x < this.x + this.image.width &&
                e.y > this.y && e.y < this.y + this.image.height) {
                this.dragging = true;
                this.onClick();
            }
        } else {
            if (e.x > this.x && e.x < this.x + this.width! &&
                e.y > this.y && e.y < this.y + this.height!) {
                this.dragging = true;
                this.onClick();
            }
        }
    }

    onMouseUp(e: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
            const event = new CustomEvent("dndDrop",
                {
                    detail: {
                        x: e.x,
                        y: e.y,
                        button: this
                    }
                }
            );
            document.body.dispatchEvent(event);
        }

    }

}
