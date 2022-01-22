class Goblin {
	constructor(game) {
		this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/goblinSprite.png");
		
		
        this.size = 0;
        this.facing = 0;
        this.state = 0;
        this.dead = false;

        this.x = 600;
        this.y = 435;
        this.speed = 100;

        this.fallAcc = 560;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
	};

	loadAnimations() {
        for (var i = 0; i < 7; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations.push([i]);
            }
        }
        //walking right and left
        //facing right = 0
        this.animations[0][0] = new Animator(this.spritesheet, 0, 194, 64, 54, 7, 0.15);
        //facing left = 1
        this.animations[0][1] = new Animator(this.spritesheet, 0, 67, 64, 54, 7, 0.15);

        //Attacking
        //facing right = 0
        this.animations[1][0] = new Animator(this.spritesheet, 0, 451, 64, 54, 5, 0.15);
        //facing left = 0
        this.animations[1][1] = new Animator(this.spritesheet, 0, 324, 64, 54, 5, 0.15);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    die() {

    };

    update() {
        
            
        //this.x += this.speed * 2 * this.game.clockTick;
            
            
            
            
        

        // TODO: need to call updateBB(); somewhere in here after we update his x and y positions

        // TODO: before we can uncomment the collision handling, we need to implement the physics because it includes velocity
        // collision handling
        /*
        var that  = this;
        this.game.entities.forEach(function (entity) {
            // NOTE: may need to add a if (entity !== that) wrapper to not compare collision with self
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) { // falling
                    if ((entity instanceof Platform) // landing // TODO: may add more entities in here later
                        && (that.lastBB.bottom) <= entity.BB.top) { // was above last tick
                        that.y = entity.BB.top - PARAMS.BLOCKWIDTH; 
                        that.velocity.y === 0; // NOTE: not sure why Chris uses === to assign velocity here, may be a bug
                    } 
                    // TODO: update state here (ex. if(that.state === 4) that.state = 0;)
                    that.updateBB();

                    if ((entity instanceof Goblin || entity instanceof Bat) // collision with enemies or obstacles, TODO: may have to add more in later
                        && (that.lastBB.bottom) <= entity.BB.top // was above last tick
                        && !entity.dead) { // entity was already dead
                        loseHeart(); // lose a heart when you collide with an enemy or obstacle
                        that.velocity.y = -240; // bounce up
                        that.velocity.x = -240; // bounce to the left
                    }
                }

                if (that.velocity.y < 0) {
                    if ((entity instanceof Platform)
                        && (that.lastBB.top) >= entity.BB.bottom) { // was below last tick
                        that.velocity.y = 0;
                        } 
                    // TODO: handle enemy collision from bottom
                }

                // TODO: handle side collision here

                
                
            }
        });
        //*/
    };

    draw(ctx) {
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2.25);
        
        
    };
}