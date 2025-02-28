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
    this.microwave.addButton();

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
      Object.assign(this, { game, x, y, width, height, ingredientButtons: [] });


      this.ingredients = [
          { name: "miso paste", img: "./assets/sides/MisoBin.png" },
          { name: "edamame", img: "./assets/sides/edamame.png" },
          { name: "tofu", img: "./assets/sides/Tofu.png" },
          { name: "green onions", img: "./assets/sides/blank.png" },
          { name: "chicken", img: "./assets/sides/blank.png" }
      ];
  }


  addButton() {
      let xStart = 250; // Button positions inside microwave
      let yStart = 200; // Below the microwave
      const buttonSize = 75;
      const spacing = 100; // Space between buttons


      for (let i = 0; i < this.ingredients.length; i++) {
          let ingredient = this.ingredients[i];


          const button = DnDButton.recButImage(
            this.game,
            xStart + i * spacing, yStart, // Position
            buttonSize, buttonSize, // Size
            ingredient.img, // Image path
            () => {
                console.log(`Added ${ingredient.name} to microwave!`);
                this.addIngredient(new Ingredient(ingredient.name));
            }
        );


          this.ingredientButtons.push(button);
          this.game.currentScene.addGameObject(button);
      }
  }


  addIngredient(ingredient) {
      this.ingredients.push(ingredient);
      console.log(`${ingredient.type} added to the microwave.`);
  }
  update() {}


  draw(ctx) {
    const image = ASSET_MANAGER.getAsset("./assets/sides/microwave.png");


    ctx.drawImage(image, this.x, this.y, this.width, this.height);
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