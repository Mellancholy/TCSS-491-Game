import Scene from '../../scene.js';
import GameObject from '../../gameObject.js';
import { ASSET_MANAGER, sceneManage } from "../../main.js";
import { Button, DnDButton } from "../../button.js";
import GameState from 'src/gameState.js';
import Ingredient from "src/scenes/counter/food.js";
import GameEngine from 'src/gameEngine.js';


export class SidesAssemblyScene extends Scene {
  game: GameEngine;
  x: number;
  y: number;
  foodMessage: string | null;
  microwave: undefined | Microwave;
  completeButton: Button | undefined;

  constructor(game: GameEngine, x: number, y: number) {
    super(game);
    this.game = game;
    this.x = x;
    this.y = y;
    this.foodMessage = null;
  };

  initalizeScene() {
    this.addGameObject(new Background(this.game));
    this.addGameObject(new FoodTray(this.game, 225, 325, 175, 100));

    this.microwave = new Microwave(this.game, 200, 0, 600, 300);
    this.addGameObject(this.microwave);
    this.microwave.addButtons();

    const condiments = [
      {
        name: "soy sauce",
        img: "./assets/sides/soysauce.png",
        x: 800,
        y: 300
      },
      {
        name: "ginger",
        img:  "./assets/sides/Ginger.png",
        x: 900,
        y: 300
      },
      {
        name: "wasabi",
        img:  "./assets/sides/wasabi.png",
        x: 850,
        y: 370
      }
    ];

    condiments.forEach(item => {
      this.addGameObject(new DraggableObject(this.game, item, item.x, item.y, 80, 80));
    })

    this.completeButton = Button.rectButton(this.game, 800, 500, 200, 50, () => {
      let orderWorkingOn = GameState.getInstance().getState('orderWorkingOn');
      orderWorkingOn.completed = true;
      sceneManage.loadScene("order");
    }, "Completed");
    this.addGameObject(this.completeButton);
  
  }
}

class Background extends GameObject {
  game: GameEngine;
  sprite: HTMLImageElement;

  constructor(game: GameEngine) {
      super(game);
      this.game = game;
      this.sprite = ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Background.png") as HTMLImageElement;
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
      ctx.drawImage(this.sprite, 0, 0, 1024, 683);
  }
}

class Microwave extends GameObject {
    game: GameEngine;
    x: number;
    y: number;
    width: number;
    height: number;
    recipes: {
        name: string;
        ingredients: string[];
        img: string;
    }[]
    cookButton: Button | null;
    ingredientButtons: Button[] | undefined;
    ingredients: Ingredient[] = [];
    microwaveSprite: HTMLImageElement;

    constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
        super(game);
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.recipes = [
            { name: "Miso Soup", ingredients: ["miso paste", "tofu", "green onions"], img: "./assets/sides/MisoSoup.png" },
            { name: "Edamame", ingredients: ["edamame"], img: "./assets/sides/cookedEdamame.png" },
            { name: "Gyoza", ingredients: ["green onions", "chicken"], img: "./assets/sides/Gyoza.png" },
            { name: "Karaage", ingredients: ["chicken"], img: "./assets/sides/Karaage.png" }
        ];

        this.cookButton = null;

        this.microwaveSprite = ASSET_MANAGER.getAsset("./assets/sides/microwaveYuh.png") as HTMLImageElement;
    }

    addButtons() {
        let xStart = 585;
        let yStart = 80;
        const buttonSize = 80;
        const xSpacing = 100;
        const ySpacing = 65;
        const columns = 2;

        this.ingredientButtons = [];

        const ingredientList = [
            { name: "miso paste", img: "./assets/sides/MisoBin.png" },
            { name: "edamame", img: "./assets/sides/edamame.png" },
            { name: "tofu", img: "./assets/sides/Tofu.png" },
            { name: "green onions", img: "./assets/sides/greenonions.png" },
            { name: "chicken", img: "./assets/sides/chicken.png" }
        ];

        for (let i = 0; i < ingredientList.length; i++) {
            let ingredient = ingredientList[i];


            let col = i % columns;
            let row = Math.floor(i / columns);

            console.log(`Placing ${ingredient.name} at col=${col}, row=${row}`);

            const inButton = Button.rectButtonImage(
                this.game,
                xStart + col * xSpacing,
                yStart + row * ySpacing,
                buttonSize, buttonSize,
                ingredient.img,
                () => {
                    console.log(`Clicked ${ingredient.name}`);
                    this.foodMessage = `${ingredient.name} added!`;
                    this.addIngredient(new Ingredient(ingredient.name));
                }
            );

            this.ingredientButtons.push(inButton);
            this.game.currentScene!.addGameObject(inButton);
        }

        const cookButtonX = 687;
        const cookButtonY = 220;

        this.cookButton = Button.rectButton(
            this.game,
            cookButtonX, cookButtonY, // Position
            75, 75, // Size
            () => { this.cookSideDish(); }, // onClick function
            //"red", // Background color
            "Cook!" // Button text
        );

        this.cookButton.disabled = true;
        this.game.currentScene!.addGameObject(this.cookButton);
    }

    addIngredient(ingredient: Ingredient) {
        if (!ingredient || !ingredient.name) {
            console.error("invalid ingredient added!");
            return;
        }
        this.ingredients.push(ingredient);
        console.log(`added ${ingredient.name} to microwave.`);
    }

    cookSideDish() {
        console.log("cooking!");

        const ingredientNames = this.ingredients.map((ing: Ingredient) => ing.name);

        for (let recipe of this.recipes) {
            if (recipe.ingredients.every(req => ingredientNames.includes(req)) &&
                ingredientNames.length === recipe.ingredients.length) {

                console.log(`${recipe.name} created`);
                this.foodMessage = `${recipe.name} created!`;
                console.log(this.foodMessage);

                this.cookedSide = new DraggableObject(
                    this.game,
                    { name: recipe.name, img: recipe.img },
                    317,
                    100,
                    100,
                    100
                );
  
                this.game.currentScene!.addGameObject(this.cookedSide);
                this.ingredients = []; // clears microwave after cooking

                return;
            }
        }

        console.log("not matching recipe");
        this.foodMessage = `No matching recipe!`;
        console.log(this.foodMessage);
        this.ingredients = [];
    }

    update() {
        if (this.cookButton) {
            this.cookButton.disabled = this.ingredients.length === 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.microwaveSprite, this.x, this.y, this.width, this.height);

        if (this.cookedSide && this.cookedSide.img) {
            const cookedImage = ASSET_MANAGER.getAsset(this.cookedSide.img) as HTMLImageElement;
            if (cookedImage) {
                ctx.drawImage(cookedImage, 317, 100, 100, 100);
            } else {
                console.warn(` no image for ${this.cookedSide.name}`);
            }
        }
        if (this.foodMessage) {  // Only draw if there’s a message
          ctx.fillStyle = "white";
          ctx.font = "20px Arial";
          ctx.textAlign = "center";
          ctx.fillText(this.foodMessage, 675, 47);
       }       
    }
}

class FoodTray extends GameObject {
  game: GameEngine;
  x: number;
  y: number;
  width: number;
  height: number;
  condiment: { name: string, img: string }[];

  constructor(game: GameEngine, x: number, y: number, width: number, height: number) {
    super(game);
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.sideDishX = x;
    this.sideDishY = y;
    this.sideDishWidth = width;
    this.sideDishHeight = height;

    this.condiment = [];
  };

  update() {};

  draw(ctx: CanvasRenderingContext2D) {
    const sprite = ASSET_MANAGER.getAsset("./assets/sides/Tray.png") as HTMLImageElement;
    ctx.drawImage(sprite, -125, -50, sprite.width + 150, sprite.height + 150);

    this.condiment.forEach(element => {
      const img = ASSET_MANAGER.getAsset(element.img) as HTMLImageElement;
      ctx.drawImage(img, this.x + 45 , this.y + 15);
    });

    // Draw the bounds
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);


    ctx.strokeRect(
        this.sideDishX,
        this.sideDishY,
        this.sideDishWidth,
        this.sideDishHeight
    );

    ctx.restore();
    let currentOrder = GameState.getInstance().getState('orderWorkingOn');
    if (currentOrder && currentOrder?.ingredients.length > 0) {
      const sprite = ASSET_MANAGER.getAsset("./assets/objects/Roll_Cut.png") as HTMLImageElement;
      ctx.drawImage(sprite, 0, 100);
    }

  };

  onDnDDrop(e: CustomEvent) {

    if(e.detail.x > this.sideDishX && e.detail.x < this.sideDishX + this.sideDishWidth && e.detail.y > this.sideDishY && e.detail.y < this.sideDishY + this.sideDishHeight) {
      console.log("dropped in food tray");
      this.condiment.push(e.detail.button.food);
      console.log(e.detail.button.food);
      const orderWorkingOn = GameState.getInstance().getState("orderWorkingOn");
      if(!orderWorkingOn) return;
      orderWorkingOn.ingredients.push(new Ingredient(e.detail.button.food.name));
      //e.detail.button.game.currentScene.rollButton.hidden = false;
    }
  }


}

class DraggableObject extends GameObject {
  game: GameEngine;
  food: { name: string, img: string };
  x: number;
  y: number;
  width: number;
  height: number;
  dnd!: DnDButton;
  
  constructor(game: GameEngine, food: { name: string; img: string; x?: number; y?: number; }, x: number, y: number, width: number, height: number) {
    super(game);
    this.game = game;
    this.food = food;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.addButton();
  };

  addButton() {
    this.dnd = DnDButton.transparentImageButton(this.game, this.x, this.y, this.width, this.height, this.food.img, () => {
      console.log("clicked on object", this.food);
    });
    this.dnd.width = this.width;
    this.dnd.height = this.height;
    this.dnd.food = this.food;
    if(this.game.currentScene) this.game.currentScene.addGameObject(this.dnd);
  }

  update() {};

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(ASSET_MANAGER.getAsset(this.food.img) as HTMLImageElement, this.x, this.y, this.width, this.height);
  };
}