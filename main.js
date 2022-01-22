const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/KnightSprites.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/goblinSprite.png");
ASSET_MANAGER.queueDownload("./sprites/floor.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gamecanvas");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Knight(gameEngine));
	//gameEngine.addEntity(new Goblin(gameEngine));
	
	gameEngine.addEntity(new Floor(this.game, 0, 550, 768));
	
	gameEngine.addEntity(new Background(this.game, 1, 1));
	
	
	

	gameEngine.init(ctx);

	gameEngine.start();
});