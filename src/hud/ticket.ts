import GameState from "src/gameState";
import { ASSET_MANAGER } from "src/main";
import Ingredient, { CONDIMENTS, Order, WRAP } from "src/scenes/counter/food";

const WIDTH = 200;
const HEIGHT = 360;

const SIDE_HEIGHT = 40

const LINES = 8
const LINE_HEIGHT = (HEIGHT - SIDE_HEIGHT) / LINES

const FOOD_WIDTH = LINE_HEIGHT
const FOOD_HEIGHT = FOOD_WIDTH

export default function drawTicket(ctx: CanvasRenderingContext2D, order: Order, x: number, y: number) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, WIDTH, HEIGHT);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#ff7f7f";
    ctx.fillText("#" + order.id, x + (WIDTH / 2), y + 25);
    ctx.fillStyle = "white";
    for(let i = 2; i < LINES; i++) {
        ctx.fillStyle = ctx.fillStyle === "#ffffff" ? "#ff7f7f" : "#ffffff";
        ctx.fillRect(x, y + (i * LINE_HEIGHT), WIDTH, LINE_HEIGHT);
    }
    ctx.fillStyle = "#ff9999"
    ctx.fillRect(x, y + (HEIGHT - SIDE_HEIGHT), WIDTH, SIDE_HEIGHT);
    ctx.strokeRect(x, y + (HEIGHT - SIDE_HEIGHT), WIDTH, SIDE_HEIGHT);

    ctx.strokeRect(x, y, WIDTH, HEIGHT);
    
    ctx.textAlign = "center";
    let itemY = y + (LINE_HEIGHT * (LINES - 1))
    const centerX = x + (WIDTH / 2)
    ctx.fillStyle = "black";
    order.ingredients.forEach((ingredient: Ingredient) => {
        ctx.fillText(ingredient.name, centerX + FOOD_WIDTH, itemY + (LINE_HEIGHT / 2));
        if(ingredient.name === "rice") {
            ctx.fillStyle = "gray";
            ctx.fillRect(centerX - FOOD_WIDTH, itemY, FOOD_WIDTH, FOOD_HEIGHT);
            ctx.fillStyle = "black";
        }
        const sprite = ASSET_MANAGER.getAsset(ingredient.img) as HTMLImageElement;
        ctx.drawImage(sprite, centerX - FOOD_WIDTH, itemY, FOOD_WIDTH, FOOD_HEIGHT); // Adjust for sprite height
        itemY -= LINE_HEIGHT
    });
    let sideText = order.sides.length === 0 ? "No sides" : "Sides: "
    console.log(order)
    order.sides.forEach((side) => {
        sideText += side.name + ", "
    })
    if(order.sides.length > 0) {
        sideText = sideText.slice(0, -2)
    }
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(sideText, x + 6, y + (HEIGHT - (SIDE_HEIGHT / 2)));
}