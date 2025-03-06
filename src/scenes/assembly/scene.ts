import Background from 'src/background.js';
import Scene from 'src/scene.js';
import { ASSET_MANAGER } from "src/main.js";
import { Button, DnDButton } from "src/button.js";
import { FILLINGS } from "src/scenes/counter/food.js";
import GameObject from 'src/gameObject.js';
import GameEngine from 'src/gameEngine';
import GameState from 'src/gameState';

export class RiceAssemblyScene extends Scene {
    game: GameEngine;
    foodBottom: FoodBottom | undefined;
    rollButton: Button | undefined;
    
    constructor(game: GameEngine) {
        super(game);
        this.game = game;
    };

    initalizeScene() {

        this.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));
        this.addGameObject(new Background(this.game, "./assets/assembly/case.jpg", 0, 150, 1024, 197));
        this.foodBottom = new FoodBottom(this.game, 227, 375, 570, 300);
        this.addGameObject(this.foodBottom);
        const binWidth = 80;
        const binHeight = 80;
        const foods = FILLINGS;
        let curFood = 0;
        let y = 240;
        for(let x = 0; x < foods.length; x++) {
            const foodBin = new FoodBin(this.game, foods[curFood], 10 + x * (binWidth + 4), y, binWidth, binHeight);
            this.addGameObject(foodBin);
            foodBin.addButton(); // add the button to the scene after the bin is added
            curFood++;
        }

        this.rollButton = Button.rectButton(this.game, 600, 320, 100, 50, () => {
            console.log("Clicked roll button");
            this.roll();
        }, "Roll") 
        this.rollButton.hidden = true;
        this.addGameObject(this.rollButton);
        
    }

    roll() {
        console.log("rolling");
        this.rollButton!.removeFromWorld = true;
        this.foodBottom!.rolled = true;
    }
}

class FoodBin extends GameObject {
    game: GameEngine;
    food: {name: string, img: string};
    x: number;
    y: number;
    width: number;
    height: number;
    dnd: DnDButton | undefined;

    constructor(game: GameEngine, food: {name: string, img: string}, x: number, y: number, width: number, height: number) {
        super(game, 'foodbin');
        this.game = game;
        this.food = food;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    addButton() {
        this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, this.food.img, () => {
            console.log("clicked on food bin", this.food);
        });
        this.dnd.width = this.width;
        this.dnd.height = this.height;
        this.dnd.food = this.food;
        if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
    }

    update() {
        
    };

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.drawImage(ASSET_MANAGER.getAsset("./assets/assembly/tray.jpg") as HTMLImageElement, this.x, this.y, this.width, this.height);
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/trays/tray_" + this.food.name + ".png") as HTMLImageElement, this.x, this.y, this.width, this.height);
        
        const bottomWidth = 80
        const bottomHeight = 35
        const xOffset = this.width - bottomWidth
        const yOffset = this.height - (bottomHeight)
        const xCount = 3
        const xSpace = bottomWidth / xCount
        const yCount = 3
        const ySpace = bottomHeight / yCount;
        // for(let row = 0; row < yCount; row++) {
        //     for(let col = 0; col < xCount; col++) {
        //         ctx.drawImage(ASSET_MANAGER.getAsset(this.food.img) as HTMLImageElement, this.x + xOffset + (xSpace * col), this.y + (yOffset / 2) - 5 + (ySpace * row))
        //     }
        // }
    };
}

const UNROLLED_HEIGHT = 120
const ROLLED_HEIGHT = 75

class FoodBottom extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    rolled: boolean;
    chops: number;
    cut: boolean;
    sliding: boolean;

    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game, 'foodbottom');
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rolled = false;
        this.chops = 0;
        this.cut = false;
        this.sliding = false;
        this.rollx = 0;
    };

    update() {
        if(!this.rolled) return;
        if(this.chops >= 15) {
            this.cut = true
            console.log("Cut sushi");
        }
        if(this.game.down) {
            if(this.game.timer!.gameTime - this.game.previousMousePositionsLatest > 0.1) {
                this.game.previousMousePositions = []
            }
            if(this.game.previousMousePositions.length === 15) {
                this.game.previousMousePositions.forEach((pos: { x: number, y: number }, index: number) => {
                    if(pos.x > this.x - (this.width / 2) && pos.x < this.x + (this.width / 2) && pos.y > this.y && pos.y < this.y + ROLLED_HEIGHT) {
                        this.chops += 1
                    }
               })
            }
        } else {
            this.game.previousMousePositions = []
        }
        
    };

    draw(ctx: CanvasRenderingContext2D) {
        let currentOrder = GameState.getInstance().getState('orderWorkingOn');
        if(!currentOrder) return;
        if (currentOrder?.ingredients.length > 0) {
            if(this.cut) {
                ctx.fillStyle = "green";
                // const cutWidth = (this.width - 50) / 6
                // for(let i = 0; i < 6; i++) {
                //     ctx.fillRect(this.x - 5 + ((cutWidth + 5) * i), this.y + 100, cutWidth, ROLLED_HEIGHT); 
                // }
                const img = ASSET_MANAGER.getAsset("./assets/objects/Roll_Cut.png") as HTMLImageElement;
                ctx.drawImage(img, this.rollx, 100);
                if(this.sliding) return;
                setTimeout(() => {
                    setInterval(() => {
                        this.rollx += 10
                        if(this.rollx > 1024) {
                            this.removeFromWorld = true
                        }
                    }, 10)
                }, 1000)
                this.sliding = true
                return;    
            }
            if(this.rolled) {
                const img = ASSET_MANAGER.getAsset("./assets/objects/Roll.png") as HTMLImageElement;
                ctx.drawImage(img, 0, 100);
                if(this.game.down) {
                    ctx.beginPath()
                    this.game.previousMousePositions.forEach((pos: { x: number; y: number; }, index: number) => {
                        if(index === 0) {
                            ctx.moveTo(pos.x, pos.y);
                        } else {
                            ctx.lineTo(pos.x, pos.y);
                        }
                    })
                    ctx.stroke()
                }
                return;
            }
        
            const bambooMatImg = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png") as HTMLImageElement;
            ctx.drawImage(bambooMatImg, this.x, this.y);

            console.log(currentOrder)
            //Draw rice and nori
            currentOrder.ingredients.filter(element => element.name === 'rice' || element.name === 'nori').forEach(element => {
                if (element.name == 'rice' || element.name == 'nori') {
                    const img = ASSET_MANAGER.getAsset(element.img) as HTMLImageElement;
                    ctx.drawImage(img, this.x, this.y);
                }
            })
            //Draw fillings
            currentOrder.ingredients.filter(element => element.name != 'rice' && element.name != 'nori').forEach(element => {
                const img = ASSET_MANAGER.getAsset(element.img) as HTMLImageElement;
                const xOffset = 50;
                const spacing = (this.width - xOffset - 50) / 6;
                for(let i = 0; i < 6; i++) {
                    ctx.drawImage(img, this.x + (i * spacing) + xOffset, this.y + 100, img.width * 2, img.height * 2);
                } 
            });
        }
    
    };
    

    onDnDDrop(e: CustomEvent) {
        let orderWorkingOn = GameState.getInstance().getState('orderWorkingOn');
        if(!orderWorkingOn) return;
        if(e.detail.x >= this.x && e.detail.x <= this.x + this.width && e.detail.y >= this.y && e.detail.y <= this.y + this.height && orderWorkingOn?.ingredients.length > 0) {
            console.log("dropped in food bottom");
            orderWorkingOn.ingredients.push(e.detail.button.food);
            e.detail.button.game.currentScene.rollButton.hidden = false;
        }
    }
}