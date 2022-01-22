class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: true,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                // console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        //window.addEventListener("keydown", event => this.keys[event.key] = true);
        //window.addEventListener("keyup", event => this.keys[event.key] = false);
        

        window.addEventListener("keydown", function(e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    if (that.options.debugging) console.log("Left/A pressed");
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    if (that.options.debugging) console.log("Right/D pressed");
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    if (that.options.debugging) console.log("Up/W pressed");
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    if (that.options.debugging) console.log("Down/S pressed");
                    break;
                case "Space":
                    that.attack = true;
                    if (that.options.debugging) console.log("Space pressed");
                    break;
                case "ShiftLeft":
                    that.shift = true;
                    if (that.options.debugging) console.log("Shift pressed");
                    break;
            }
        }, false);


        window.addEventListener("keyup", function(e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    if (that.options.debugging) console.log("Left/A released");
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    if (that.options.debugging) console.log("Right/D released");
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    if (that.options.debugging) console.log("Up/W released");
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    if (that.options.debugging) console.log("Down/S released");
                    break;
                case "Space":
                    that.attack = false;
                    if (that.options.debugging) console.log("Space released");
                    break;
                case "ShiftLeft":
                    that.shift = false;
                    if (that.options.debugging) console.log("Shift released");
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};