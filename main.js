const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// sprites

// backgrounds
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Rice_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Roll_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Sides_Background.JPG");
ASSET_MANAGER.queueDownload("./sprites/backgrounds/Order_Background.JPG");

// buttons
ASSET_MANAGER.queueDownload("./sprites/buttons/Rice_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/buttons/Roll_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/buttons/Sides_Button.JPG");
ASSET_MANAGER.queueDownload("./sprites/buttons/Order_Button.JPG");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	//new SceneManager(gameEngine);

	gameEngine.start();

});