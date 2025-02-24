import StationRiceCooker from "../riceStation/stationRiceCooker.js";
import GameObject from "../../gameObject.js";
import { ASSET_MANAGER } from "../../main.js";
import Nori from "../riceStation/nori.js";
import Ingredient from "../counter/food.js";
import Wrap from "../counter/food.js";
import { sceneManage, orderManage, rollManage } from '../../main.js';

export default class BambooRat extends GameObject {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;

        this.rice = false;
        this.nori = false;
    }

    update() {
        console.log(this.rice);
        if (this.rice) {
            rollManage.addIngredient(new Ingredient("rice"));
        }

        if (this.nori) {
            rollManage.addIngredient(new Wrap("nori"));
        }
    }

    draw(ctx) {
        const matSprite = ASSET_MANAGER.getAsset("./assets/objects/BambooMat_Empty.png");
        ctx.drawImage(matSprite, this.x, this.y);
        
        if (this.nori) {
            const noriSprite = ASSET_MANAGER.getAsset("./assets/objects/Nori.png");
            ctx.drawImage(noriSprite, this.x, this.y, 300, 300);
        }

        if (this.rice) {
            const riceSprite = ASSET_MANAGER.getAsset("./assets/objects/Rice_Cooked.png");
            ctx.drawImage(riceSprite, this.x, this.y);
        }

    }

    onMouseUp(e) {
        if (e.clientX >= this.x && e.clientX <= this.x + 512 &&
            e.clientY >= this.y && e.clientY <= this.y + 512) {

            const draggedItem = this.game.currentDraggedItem;
            console.log(draggedItem);

            if (draggedItem instanceof Nori) {
                this.nori = true;
            }
            if (draggedItem instanceof StationRiceCooker ) {
                this.rice = true;
            }
        }
    }

}