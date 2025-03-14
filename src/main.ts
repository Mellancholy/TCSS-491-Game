import AssetManager from "./assetManager.js";
import GameEngine from "./gameEngine.js";
import SceneManager from "./sceneManager.js";
import HUD from "./hud/hud.js";



export const ASSET_MANAGER = new AssetManager();
export let sceneManage: SceneManager;

// sprites

// backgrounds
ASSET_MANAGER.queueDownload("./assets/backgrounds/Rice_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Roll_Background.JPG");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Order_Background.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Order_Foreground.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Station_Background.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Minigame_Background.png");
ASSET_MANAGER.queueDownload("./assets/backgrounds/Title_Background.png");

// rice station
ASSET_MANAGER.queueDownload("./assets/objects/RiceCooker.png");
ASSET_MANAGER.queueDownload("./assets/objects/BambooMat.png");
ASSET_MANAGER.queueDownload("./assets/objects/Rice.png");
ASSET_MANAGER.queueDownload("./assets/objects/Rice_Cooked.png");
ASSET_MANAGER.queueDownload("./assets/objects/Nori.png");
ASSET_MANAGER.queueDownload("./assets/objects/Nori_Source.png");

// buttons
ASSET_MANAGER.queueDownload("./assets/button/Rice_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Roll_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Roll_Button2.png");
ASSET_MANAGER.queueDownload("./assets/button/Side_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Order_Button.JPG");
ASSET_MANAGER.queueDownload("./assets/button/Start_Button.png");

//sushi assembly
ASSET_MANAGER.queueDownload("./assets/assembly/case.jpg");
ASSET_MANAGER.queueDownload("./assets/assembly/tray.jpg");
ASSET_MANAGER.queueDownload("./assets/objects/Roll.png");
ASSET_MANAGER.queueDownload("./assets/objects/Roll_Cut.png");

//Wash that rice
ASSET_MANAGER.queueDownload('./assets/hand.png');
ASSET_MANAGER.queueDownload('./assets/pot_top_outside.png');
ASSET_MANAGER.queueDownload('./assets/rotate.png');
ASSET_MANAGER.queueDownload('./assets/checkmark.png');
ASSET_MANAGER.queueDownload('./assets/objects/inside_rice.png');
ASSET_MANAGER.queueDownload('./assets/objects/middle_rice.png');
ASSET_MANAGER.queueDownload('./assets/objects/outside_rice.png');

// fill the pot
ASSET_MANAGER.queueDownload('./assets/objects/Faucet_Off.png');
ASSET_MANAGER.queueDownload('./assets/objects/Faucet_On.png');
ASSET_MANAGER.queueDownload('./assets/objects/Pot_Animation.png');
ASSET_MANAGER.queueDownload('./assets/backgrounds/FillThePot_Background.png');

// Don't burn the rice.
ASSET_MANAGER.queueDownload('./assets/objects/RiceCooker_On.png');
ASSET_MANAGER.queueDownload('./assets/objects/RiceCooker_Off.png');

// Swat the flies
ASSET_MANAGER.queueDownload("./assets/flies.png");
ASSET_MANAGER.queueDownload("./assets/swatter.png");

//Counter
ASSET_MANAGER.queueDownload("./assets/characters/dummy.png");
ASSET_MANAGER.queueDownload("./assets/button/exclam.png");

// Food bits
ASSET_MANAGER.queueDownload("./assets/assembly/crab.png");
ASSET_MANAGER.queueDownload("./assets/assembly/cucumber.png");
ASSET_MANAGER.queueDownload("./assets/assembly/tuna.png");
ASSET_MANAGER.queueDownload("./assets/assembly/avocado.png");
ASSET_MANAGER.queueDownload("./assets/assembly/salmon.png");
ASSET_MANAGER.queueDownload("./assets/assembly/uni.png");
ASSET_MANAGER.queueDownload("./assets/assembly/tamago.png");
ASSET_MANAGER.queueDownload("./assets/assembly/octopus.png");

// Customers
ASSET_MANAGER.queueDownload("./assets/characters/Customer_0.png");
ASSET_MANAGER.queueDownload("./assets/characters/Customer_1.png");
ASSET_MANAGER.queueDownload("./assets/characters/Customer_2.png");
ASSET_MANAGER.queueDownload("./assets/characters/Customer_3.png");
ASSET_MANAGER.queueDownload("./assets/characters/Customer_4.png");
ASSET_MANAGER.queueDownload("./assets/characters/Customer_5.png");

// Trays
ASSET_MANAGER.queueDownload("./assets/trays/tray_avocado.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_crab.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_cucumber.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_octopus.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_salmon.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_tamago.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_tuna.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_uni.png");
ASSET_MANAGER.queueDownload("./assets/trays/tray_empty.png");

ASSET_MANAGER.queueDownload("./assets/sides/microwaveYuh.png");
ASSET_MANAGER.queueDownload("./assets/sides/Tofu.png");
ASSET_MANAGER.queueDownload("./assets/sides/MisoBin.png");
ASSET_MANAGER.queueDownload("./assets/sides/greenonions.png");
ASSET_MANAGER.queueDownload("./assets/sides/Ginger.png");
ASSET_MANAGER.queueDownload("./assets/sides/edamame.png");
ASSET_MANAGER.queueDownload("./assets/sides/Tray.png");
ASSET_MANAGER.queueDownload("./assets/sides/soysauce.png");
ASSET_MANAGER.queueDownload("./assets/sides/wasabi.png");
ASSET_MANAGER.queueDownload("./assets/sides/Gyoza.png");
ASSET_MANAGER.queueDownload("./assets/sides/MisoSoup.png");
ASSET_MANAGER.queueDownload("./assets/sides/Karaage.png");
ASSET_MANAGER.queueDownload("./assets/sides/chicken.png");
ASSET_MANAGER.queueDownload("./assets/sides/cookedEdamame.png");

ASSET_MANAGER.queueDownload("./assets/button/trash.png");

// SOUNDS
ASSET_MANAGER.queueDownload('./assets/sounds/jingle.mp3');
ASSET_MANAGER.queueDownload('./assets/sounds/doorchime.mp3');
ASSET_MANAGER.queueDownload('./assets/sounds/background_music.mp3');

ASSET_MANAGER.queueDownload('./assets/objects/coin_add.png');
ASSET_MANAGER.queueDownload('./assets/objects/coin_ui.png');


ASSET_MANAGER.downloadAll(() => {
    const gameEngine = new GameEngine({
        debugging: false,
    });

	const canvas = document.getElementById("gameWorld") as HTMLCanvasElement;
    if (!canvas) {
        throw new Error("Canvas element not found");
    }
	const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas context not found");
    }

	gameEngine.init(ctx);

    let hud = new HUD(gameEngine);
    gameEngine.addEntity(hud);
    gameEngine.hud = hud;

    sceneManage = new SceneManager(gameEngine);
	gameEngine.addEntity(sceneManage);
    gameEngine.sceneManager = sceneManage;

    // this won't play because of autoplay
    // ASSET_MANAGER.playAsset('./assets/sounds/background_music.mp3');
    

	gameEngine.start();

});

/** Creates an alias for requestAnimationFrame for backwards compatibility */
//@ts-expect-error
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame || // @ts-expect-error
        window.webkitRequestAnimationFrame || // @ts-expect-error
        window.mozRequestAnimationFrame || // @ts-expect-error
        window.oRequestAnimationFrame || // @ts-expect-error
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback: TimerHandler, element: any) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();