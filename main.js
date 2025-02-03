const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// sprites

// backgrounds
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Rice_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Roll_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Sides_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Order_Background.JPG");

// buttons
ASSET_MANAGER.queueDownload("./sprites/button/Rice_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/button/Roll_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/button/Side_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/button/Order_Button.JPG");

//Wash that rice
ASSET_MANAGER.queueDownload('./assets/hand.png');
ASSET_MANAGER.queueDownload('./assets/pot_top.png');
ASSET_MANAGER.queueDownload('./assets/pot_top_outside.png');
ASSET_MANAGER.queueDownload('./assets/rotate.png');
ASSET_MANAGER.queueDownload('./assets/checkmark.png');

// fill the pot
ASSET_MANAGER.queueDownload('./assets/Cup.png');
ASSET_MANAGER.queueDownload('./assets/WaterPitcher.png');

// Don't burn the rice.
ASSET_MANAGER.queueDownload('./assets/ricecooker2.png');

ASSET_MANAGER.queueDownload('./assets/jingle.mp3');

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	const sceneManage = new SceneManager(gameEngine);
	gameEngine.addEntity(sceneManage);

	gameEngine.addEntity(new StationSwitcher(gameEngine, sceneManage.loadStation.bind(sceneManage)));

	gameEngine.start();

});