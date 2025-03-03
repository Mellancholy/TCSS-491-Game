import Scene from '../../scene.js';
import GameObject from '../../gameObject.js';
import {ASSET_MANAGER, rollManage} from "../../main.js";
import { Button, DnDButton } from "../../button.js";
import Ingredient from "../counter/food.js";


export class SidesAssemblyScene extends Scene {
  constructor(game, x, y) {
    super(game);
    Object.assign(this, { game, x, y });
  };

  initalizeScene() {
    this.addGameObject(new Background(this.game));
    this.addGameObject(new FoodTray(this.game, 200, 300, 600, 370));

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
        img:  "./assets/sides/wasabi.jpg",
        x: 850,
        y: 370
      }
    ];

    condiments.forEach(item => {
      this.addGameObject(new DraggableObject(this.game, item, item.x, item.y, 80, 80));
    })
    
    const ingredients = [
      {
        name: "miso paste",
        img: "./assets/sides/MisoBin.png"
      },
      {
        name: "tofu",
        img: "./assets/sides/Tofu.png"
      },
      {
        name: "green onions",
        img: "./assets/sides/blank.png"
      },
      {
        name: "chicken",
        img: "./assets/sides/blank.png"
      },
      {
        name: "edamame",
        img: "./assets/sides/blank.png"
      }
    ]
    const sides = [
      {
        name: "karaage",
        img: "./assets/sides/Karaage.png"
      },
      {
        name: "miso soup",
        img: "./assets/sides/MisoSoup.png"
      },
      {
        name: "gyoza",
        img: "./assets/sides/Gyoza.png"
      },
      {
        name: "edamame",
        img: "./assets/sides/blank.png"
      }
    ]
  }
}

class Background extends GameObject {
  constructor(game) {
      super(game);
      Object.assign(this, { game });
  }

  update() {}

  draw(ctx) {
      ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Backgrounds.png"), 0, 0, 1024, 683);
  }
}

class Microwave extends GameObject {
  constructor(game, x, y, width, height) {
      super(game);
      Object.assign(this, { game, x, y, width, height, ingredientButtons: [], ingredients: [], cookedSide: null });

      this.recipes = [
          { name: "Miso Soup", ingredients: ["miso paste", "tofu", "green onions"], img: "./assets/sides/MisoSoup.png" },
          { name: "Edamame", ingredients: ["edamame"], img: "./assets/sides/Edamame.png" },
          { name: "Gyoza", ingredients: ["chicken", "green onions"], img: "./assets/sides/Gyoza.png" },
          { name: "Karaage", ingredients: ["chicken"], img: "./assets/sides/Karaage.png" }
      ];

      this.cookButton = null; // Store button reference
  }

  addButtons() {
      let xStart = 250;  
      let yStart = 200;  
      const buttonSize = 75;
      const spacing = 100;  

      this.ingredientButtons = [];
      this.buttons = [];

      const ingredientList = [
          { name: "miso paste", img: "./assets/sides/MisoBin.png" },
          { name: "edamame", img: "./assets/sides/edamame.png" },
          { name: "tofu", img: "./assets/sides/Tofu.png" },
          { name: "green onions", img: "./assets/sides/blank.png" },
          { name: "chicken", img: "./assets/sides/blank.png" }
      ];

      for (let i = 0; i < ingredientList.length; i++) {
          let ingredient = ingredientList[i];

          const inButton = Button.recButImage(
              this.game,
              xStart + i * spacing, yStart, 
              buttonSize, buttonSize, 
              ingredient.img, 
              () => {
                  console.log(`✅ Added ${ingredient.name} to microwave!`);
                  this.addIngredient(new Ingredient(ingredient.name));
              }
          );

          this.ingredientButtons.push(inButton);
          this.game.currentScene.addGameObject(inButton);
      }

      const cookButtonX = 725;
      const cookButtonY = 100;

      this.cookButton = Button.rectButton(
          this.game,
          cookButtonX, cookButtonY,
          buttonSize, 75,
          () => {
              this.cookSideDish();
          },
          "Cook!"
      );

      this.cookButton.disabled = true; 
      this.game.currentScene.addGameObject(this.cookButton);
  }

  addIngredient(ingredient) {
      if (!ingredient || !ingredient.type) {
          console.error("invalid ingredient added!");
          return;
      }
      this.ingredients.push(ingredient);
      console.log(`added ${ingredient.type} to microwave.`);
  }

  cookSideDish() {
      console.log("cooking!");

      const ingredientNames = this.ingredients.map(ing => ing.type);

      for (let recipe of this.recipes) {
          if (recipe.ingredients.every(req => ingredientNames.includes(req)) &&
              ingredientNames.length === recipe.ingredients.length) {
              
              console.log(`${recipe.name} created`);
              
              this.cookedSide = { name: recipe.name, img: recipe.img };
              this.ingredients = []; // clears microwave after cooking

              return;
          }
      }

      console.log("not matching recipe");
  }

  update() {
      if (this.cookButton) {
          this.cookButton.disabled = this.ingredients.length === 0;
      }
  }

  draw(ctx) {
      const image = ASSET_MANAGER.getAsset("./assets/sides/microwave.png");
      ctx.drawImage(image, this.x, this.y, this.width, this.height);

      if (this.cookedSide && this.cookedSide.img) {
          const cookedImage = ASSET_MANAGER.getAsset(this.cookedSide.img);
          if (cookedImage) {
              ctx.drawImage(cookedImage, this.x + this.width / 3, this.y + this.height / 3, 100, 100);
          } else {
              console.warn(` no image for ${this.cookedSide.name}`);
          }
      }
  }
}

class FoodTray extends GameObject {
  constructor(game, x, y, width, height) {
    super(game);
    Object.assign(this, { game, x, y, width, height, condiment: [] });
  };

  update() {};

  draw(ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset("./assets/sides/Tray.png"), this.x, this.y, this.width, this.height);

    this.condiment.forEach(element => {
      const img = ASSET_MANAGER.getAsset(element.img)
      ctx.drawImage(img, this.x + 45 , this.y + 15);
    });

    // Draw the bounds
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);


    ctx.strokeRect(
        this.x,
        this.y,
        this.width / 4,
        this.height / 4
    );

    ctx.restore();


  };

  onDnDDrop(e) {
    console.log("dropped");
    console.log(e);
    console.log(e.detail)
    if(e.detail.x > this.x && e.detail.x < this.x + (this.width / 4) && e.detail.y > this.y && e.detail.y < this.y + this.height/4) {
      console.log("dropped in food tray");
      this.condiment.push(e.detail.button.food);
      console.log(e.detail.button.food);
      rollManage.addIngredient(new Ingredient(e.detail.button.food.name));
      //e.detail.button.game.currentScene.rollButton.hidden = false;
    }
  }


}

class DraggableObject extends GameObject {
  constructor(game, food, x, y, width, height) {
    super(game);
    Object.assign(this, { game, food, x, y, width, height });
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

  draw(ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset(this.food.img), this.x, this.y, this.width, this.height);
  };
}