import Background from 'src/background.js';
import Scene from 'src/scene.js';
import GameObject from 'src/gameObject.js';
import { ASSET_MANAGER } from "src/main.js";
import { Button, DnDButton } from "src/button.js";
import { rollManage , orderManage } from 'src/main.js';
import Ingredient from "src/scenes/counter/food.js";
import GameEngine from 'src/gameEngine';

export class RiceAssemblyScene extends Scene {
    game: GameEngine;
    foodBottom: FoodBottom | undefined;
    rollButton: Button | undefined;
    
    constructor(game: GameEngine) {
        super(game);
        this.game = game;
    };

    initalizeScene() {

        super.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));
        super.addGameObject(new Background(this.game, "./assets/assembly/case.jpg", 0, 150, 1024, 197));
        this.foodBottom = new FoodBottom(this.game, 227, 375, 570, 300);
        super.addGameObject(this.foodBottom);
        const binWidth = 80;
        const binHeight = 80;
        const foods = [
            {
                name: "avocado",
                img: "./assets/assembly/avocado.png",
            },
            {
                name: "crab",
                img: "./assets/assembly/crab.png",
            },
            {
                name: "cucumber",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "octopus",
                img: "./assets/assembly/octopus.png",
            },
            {
                name: "salmon",
                img: "./assets/assembly/salmon.png",
            },
            {
                name: "tuna",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "uni",
                img: "./assets/assembly/uni.png",
            },
            {
                name: "tamago",
                img: "./assets/assembly/tamago.png",
            },
            {
                name: "empty",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "empty",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "empty",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "empty",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "empty",
                img: "./assets/assembly/cucumber.png",
            }
        ]
        let curFood = 0;
        let y = 240;
        for(let x = 0; x < 12; x++) {
            const foodBin = new FoodBin(this.game, foods[curFood], 10 + x * (binWidth + 4), y, binWidth, binHeight);
            super.addGameObject(foodBin);
            foodBin.addButton(); // add the button to the scene after the bin is added
            curFood++;
        }

        this.rollButton = Button.rectButton(this.game, 600, 320, 100, 50, () => {
            console.log("Clicked roll button");
            this.roll()
            rollManage!.completeRoll();
        }, "Roll") 
        this.rollButton.hidden = true;
        super.addGameObject(this.rollButton)
        super.addGameObject(new SceneUpdater(this.game, this));
        
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
    foods: {name: string, img: string}[];
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
        this.foods = [];
        this.rolled = false;
        this.chops = 0;
        this.cut = false;
        this.sliding = false;
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
        if (rollManage.activeIngredients.length > 0) {
            if(this.cut) {
                ctx.fillStyle = "green";
                const cutWidth = (this.width - 50) / 6
                for(let i = 0; i < 6; i++) {
                    ctx.fillRect(this.x - 5 + ((cutWidth + 5) * i), this.y + 100, cutWidth, ROLLED_HEIGHT); 
                }
                if(this.sliding) return;
                setTimeout(() => {
                    setInterval(() => {
                        this.x += 10
                        if(this.x > 1024) {
                            this.removeFromWorld = true
                        }
                    }, 10)
                }, 1000)
                this.sliding = true
                return;    
            }
            if(this.rolled) {
                ctx.fillStyle = "green";
                ctx.fillRect(this.x, this.y + 100, this.width - 50, ROLLED_HEIGHT);
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

            rollManage.activeIngredients.forEach(element => {
                if (element.type == 'rice' || element.type == 'nori') {
                    const img = ASSET_MANAGER.getAsset(element.img) as HTMLImageElement;
                    ctx.drawImage(img, this.x, this.y);
                }
            })
            this.foods.forEach(element => {
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
        //console.log("dropped");
        //console.log(e);
        //console.log(e.detail)
        if(e.detail.x >= this.x && e.detail.x <= this.x + this.width && e.detail.y >= this.y && e.detail.y <= this.y + this.height && rollManage.activeIngredients.length > 0) {
            console.log("dropped in food bottom");
            this.foods.push(e.detail.button.food);
            rollManage.addIngredient(new Ingredient(e.detail.button.food.name));
            e.detail.button.game.currentScene.rollButton.hidden = false;
        }
    }
}

class SceneUpdater extends GameObject {
    game: GameEngine;
    scene: RiceAssemblyScene;
    orderManageButtonExists: boolean;

    constructor(game: GameEngine, scene: RiceAssemblyScene) {
        super(game);
        this.game = game;
        this.scene = scene;
        this.orderManageButtonExists = false;
    }

    update() {

        if (!this.orderManageButtonExists) {
            this.orderManageButtonExists = true;
            orderManage.orderButton.removeFromWorld = false
            this.scene.addGameObject(orderManage.orderButton);
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
    };
}