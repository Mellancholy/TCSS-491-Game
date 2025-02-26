import Scene from '../../scene.js';
import GameObject from '../../gameObject.js';
import { ASSET_MANAGER } from "../../main.js";
import { Button, DnDButton } from "../../button.js";
import Ingredient from "../counter/food.js";


export class SidesAssemblyScene extends Scene {
  constructor(game, x, y) {
    super(game);
    Object.assign(this, { game, x, y });
  };

  initalizeScene() {
    this.addGameObject(new Background(this.game));
    this.addGameObject(new FoodTray(this.game, null, 200, 300, 650, 500));

    // this.foodTray = new this.foodTray(this.game, 700, 290, 120, 120);
    // this.addGameObject(this.foodTray);

    //this.microwave = new this.microwave(this.game, 1024/2, 100, 200, 200);
    //this.addGameObject(this.microwave);

    const tableItems = [
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

    tableItems.forEach(item => {
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
      ctx.drawImage(ASSET_MANAGER.getAsset("./assets/backgrounds/Station_Backgrounds.png"), 0, 0, 1024, 768);
  }
}

class Microwave extends GameObject {

}

class FoodTray extends GameObject {
  constructor(game, food, x, y, width, height) {
    super(game);
    Object.assign(this, { game, food, x, y, width, height });
  };

  update() {};

  draw(ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset("./assets/sides/Tray.png"), this.x, this.y, this.width, this.height);
  };
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