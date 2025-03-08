import GameState from "src/gameState";
import { ASSET_MANAGER } from "src/main";
import Ingredient, { CONDIMENTS, Order, WRAP } from "src/scenes/counter/food";

const WIDTH = 200;
const HEIGHT = 360;

const FOOD_WIDTH = 80
const FOOD_HEIGHT = 80

export default function drawTicket(ctx: CanvasRenderingContext2D, order: Order, x: number, y: number) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.strokeRect(x, y, WIDTH, HEIGHT);
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    let itemY = y + 10
    const centerX = x + (WIDTH / 2)
    order.ingredients.toReversed().forEach((ingredient: Ingredient) => {
        if (ingredient.name === "rice" || ingredient.name === "nori") {
            ctx.fillText(ingredient.name, centerX, itemY);
            itemY += 20
        } else {
            const sprite = ASSET_MANAGER.getAsset(ingredient.img) as HTMLImageElement;
            ctx.drawImage(sprite, centerX - FOOD_WIDTH / 2, itemY, FOOD_WIDTH, FOOD_HEIGHT); // Adjust for sprite height
            itemY += (FOOD_HEIGHT - 10);
        }
    });
    order.sides.forEach((side) => {
        ctx.fillText(side.name, centerX, itemY);
        itemY += 20; // Increment placement upwards as index increases
    })
}