import Background from '../../background.js';
import Scene from '../../scene.js';
import GameObject from '../../gameObject.js';
import { ASSET_MANAGER } from "../../main.js";
import { Button, DnDButton } from "../../button.js";
import { rollManage , orderManage } from '../../main.js';
import Ingredient from "../counter/food.js";

export class RiceAssemblyScene extends Scene {
    constructor(game) {
        super(game);
        Object.assign(this, { game });
    };

    initalizeScene() {

        this.addGameObject(new Background(this.game, "./assets/backgrounds/Station_Background.png"));
        this.addGameObject(new Background(this.game, "./assets/assembly/case.jpg", 0, 150, 1024, 197));
        this.foodBottom = new FoodBottom(this.game, 227, 375, 570, 300);
        this.addGameObject(this.foodBottom);
        const binWidth = 80;
        const binHeight = 80;
        const foods = [
            {
                name: "rice",
                img: "./assets/assembly/crab.png",
            },
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
                name: "salmon",
                img: "./assets/assembly/salmon.png",
            },
            {
                name: "tuna",
                img: "./assets/assembly/tuna.png",
            },
            {
                name: "shrimp",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "eel",
                img: "./assets/assembly/cucumber.png",
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
                name: "idk",
                img: "./assets/assembly/cucumber.png",
            },
            {
                name: "idk",
                img: "./assets/assembly/cucumber.png",
            }
        ]
        let curFood = 0;
        let y = 240;
        for(let x = 0; x < 12; x++) {
            const foodBin = new FoodBin(this.game, foods[curFood], 10 + x * (binWidth + 4), y, binWidth, binHeight);
            this.addGameObject(foodBin);
            foodBin.addButton(); // add the button to the scene after the bin is added
            curFood++;
        }

        this.rollButton = Button.rectButton(this.game, 600, 320, 100, 50, () => {
            console.log("Clicked roll button");
            this.roll()
            rollManage.completeRoll();
        }, "Roll") 
        this.rollButton.hidden = true;
        this.addGameObject(this.rollButton)
        this.addGameObject(new SceneUpdater(this.game, this));
        
    }

    roll() {
        console.log("rolling");
        this.rollButton.removeFromWorld = true;
        this.foodBottom.rolled = true;
    }
}

class FoodBin extends GameObject {
    constructor(game, food, x, y, width, height) {
        super(game, 'foodbin');
        Object.assign(this, { game, food, x, y, width, height });
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

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./assets/assembly/tray.jpg"), this.x, this.y, this.width, this.height);
        
        const bottomWidth = 80
        const bottomHeight = 35
        const xOffset = this.width - bottomWidth
        const yOffset = this.height - (bottomHeight)
        const xCount = 3
        const xSpace = bottomWidth / xCount
        const yCount = 3
        const ySpace = bottomHeight / yCount;
        for(let row = 0; row < yCount; row++) {
            for(let col = 0; col < xCount; col++) {
                ctx.drawImage(ASSET_MANAGER.getAsset(this.food.img), this.x + xOffset + (xSpace * col), this.y + (yOffset / 2) - 5 + (ySpace * row))
            }
        }
    };
}

const UNROLLED_HEIGHT = 120
const ROLLED_HEIGHT = 75

class FoodBottom extends GameObject {
    constructor(game, x, y, width, height) {
        super(game, 'foodbottom');
        Object.assign(this, { game, x, y, width, height, foods: [], rolled: false, chops: 0, cut: false});

    };

    update() {
        if(!this.rolled) return;
        if(this.chops >= 15) {
            this.cut = true
            console.log("Cut sushi");
        }
        if(this.game.down) {
            if(this.game.timer.gameTime - this.game.previousMousePositionsLatest > 0.1) {
                this.game.previousMousePositions = []
            }
            if(this.game.previousMousePositions.length === 15) {
                this.game.previousMousePositions.forEach((pos, index) => {
                    if(pos.x > this.x - (this.width / 2) && pos.x < this.x + (this.width / 2) && pos.y > this.y && pos.y < this.y + ROLLED_HEIGHT) {
                        this.chops += 1
                    }
               })
            }
        } else {
            this.game.previousMousePositions = []
        }
        
    };

    draw(ctx) {
        if (rollManage.activeIngredients.length > 0) {
            if(this.cut) {
                ctx.fillStyle = "green";
                const cutWidth = (this.width - 50) / 6
                for(let i = 0; i < 6; i++) {
                    ctx.fillRect(this.x - 5 + ((cutWidth + 5) * i), this.y + 100, cutWidth, ROLLED_HEIGHT); 
                }
                if(this.game.sliding) return;
                setTimeout(() => {
                    setInterval(() => {
                        this.x += 10
                        if(this.x > 1024) {
                            this.removeFromWorld = true
                        }
                    }, 10)
                }, 1000)
                this.game.sliding = true
                return;    
            }
            if(this.rolled) {
                ctx.fillStyle = "green";
                ctx.fillRect(this.x, this.y + 100, this.width - 50, ROLLED_HEIGHT);
                if(this.game.down) {
                    ctx.beginPath()
                    this.game.previousMousePositions.forEach((pos, index) => {
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
        
            const bambooMatImg = ASSET_MANAGER.getAsset("./assets/objects/BambooMat.png");
            ctx.drawImage(bambooMatImg, this.x, this.y);

            rollManage.activeIngredients.forEach(element => {
                if (element.type == 'rice' || element.type == 'nori') {
                    const img = ASSET_MANAGER.getAsset(element.img);
                    ctx.drawImage(img, this.x, this.y);
                }
            })
            this.foods.forEach(element => {
                const img = ASSET_MANAGER.getAsset(element.img)
                const xOffset = 50;
                const spacing = (this.width - xOffset - 50) / 6;
                for(let i = 0; i < 6; i++) {
                    ctx.drawImage(img, this.x + (i * spacing) + xOffset, this.y + 100, img.width * 2, img.height * 2);
                } 
            });
        }
    
    };
    

    onDnDDrop(e) {
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
    constructor(game, scene) {
        super(game);
        Object.assign(this, { game , scene });
        this.orderManageButtonExists = false;
    }

    update() {

        if (!this.orderManageButtonExists) {
            this.orderManageButtonExists = true;
            orderManage.orderButton.removeFromWorld = false
            this.scene.addGameObject(orderManage.orderButton);
        }
    };

    draw(ctx) {
    
    };
}