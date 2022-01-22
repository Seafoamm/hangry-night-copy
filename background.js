class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background.png");

    };
    update () {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 768, 600);
    
    };
};

class Floor {
    constructor(game, x, y, w) {
        Object.assign(this, {game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/floor.png")

        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
    };

    update() {
        
    };

    draw(ctx) {
        for (var i = 0; i <= 702; i+= 78) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.drawImage(this.spritesheet, i, 550, 78, 77);
        };
        
    };
};
