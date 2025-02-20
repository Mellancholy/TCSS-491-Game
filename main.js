import AssetManager from "./assetManager.js";
import GameEngine from "./gameEngine.js";
import SceneManager from "./sceneManager.js";
import StationSwitcher from "./stationSwitcher.js";

const gameEngine = new GameEngine();

export const ASSET_MANAGER = new AssetManager();

// sprites

// backgrounds
ASSET_MANAGER.queueDownload("./assets/backgrounds/Rice_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Roll_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Sides_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Order_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Station_Background.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Counter_Background.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Station_Backgrounds.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Minigame_Background.png");

// rice station
ASSET_MANAGER.queueDownload("./assets/objects/RiceCooker_Full.png");
ASSET_MANAGER.queueDownload("./assets/objects/RiceCooker_Low.png");
ASSET_MANAGER.queueDownload("./assets/objects/RiceCooker_Empty.png");
ASSET_MANAGER.queueDownload("./assets/objects/BambooMat_Empty.png");
ASSET_MANAGER.queueDownload("./assets/objects/Rice_Cooked.png");

// buttons
ASSET_MANAGER.queueDownload("./assets/button/Rice_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Roll_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Side_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Order_Button.JPG");

//sushi assembly
ASSET_MANAGER.queueDownload("./assets/assembly/case.jpg");
ASSET_MANAGER.queueDownload("./assets/assembly/tray.jpg");

//Wash that rice
ASSET_MANAGER.queueDownload('./assets/hand.png');
ASSET_MANAGER.queueDownload('./assets/pot_top.png');
ASSET_MANAGER.queueDownload('./assets/pot_top_outside.png');
ASSET_MANAGER.queueDownload('./assets/rotate.png');
ASSET_MANAGER.queueDownload('./assets/checkmark.png');

// fill the pot
ASSET_MANAGER.queueDownload('./assets/objects/Faucet_Off.png');
ASSET_MANAGER.queueDownload('./assets/objects/Faucet_On.png');
ASSET_MANAGER.queueDownload('./assets/objects/Pot_Animation.png');
ASSET_MANAGER.queueDownload('./assets/backgrounds/FillThePot_Background.png');

// Don't burn the rice.
ASSET_MANAGER.queueDownload('./assets/objects/RiceCooker_On.png');
ASSET_MANAGER.queueDownload('./assets/objects/RiceCooker_Off.png');


ASSET_MANAGER.queueDownload('./assets/sounds/jingle.mp3');

// Swat the flies
ASSET_MANAGER.queueDownload("./assets/flies.png");
ASSET_MANAGER.queueDownload("./assets/swatter.png");

//Counter
ASSET_MANAGER.queueDownload("./assets/characters/dummy.png");

// Food bits
ASSET_MANAGER.queueDownload("./assets/assembly/crab.png");
ASSET_MANAGER.queueDownload("./assets/assembly/cucumber.png");
ASSET_MANAGER.queueDownload("./assets/assembly/tuna.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(sceneManage);

	gameEngine.addEntity(new StationSwitcher(gameEngine, sceneManage.loadScene.bind(sceneManage)));

	gameEngine.start();

});

/** Creates an alias for requestAnimationFrame for backwards compatibility */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback, element) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();

const sceneManage = new SceneManager(gameEngine);
export default sceneManage;