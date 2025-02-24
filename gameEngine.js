import Timer from "./timer.js";
import Swatter from "./scenes/swatTheFlies/swatter.js";
import Faucet from "./scenes/fillThePot/faucet.js";
import RiceCooker from "./scenes/dontBurnRice/ricecooker.js";
import Fly from "./scenes/swatTheFlies/fly.js";
import StationRiceCooker from "./scenes/riceStation/stationRiceCooker.js";

// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

export default class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.down = null;
        this.previousMousePositionsDelay = 3;
        this.previousMousePositionsDelayCounter = 0;
        this.previousMousePositions = [];
        this.previousMousePositionsLatest = 0;
        this.wheel = null;
        this.keys = {};
        this.currentDraggedItem = null;



        // Options and the Details
        this.options = options || {
            debugging: false,
        };

        this.currentScene = null;
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
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x , y: y };
        }
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            that.move = getXandY(e);
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
            this.previousMousePositionsDelayCounter++;

            if(this.previousMousePositionsDelayCounter >= this.previousMousePositionsDelay) {
                if (this.previousMousePositions.length >= 15) {
                    this.previousMousePositions.shift();
                }
                this.previousMousePositions.push(this.mouse);
                this.previousMousePositionsDelayCounter = 0;
                this.previousMousePositionsLatest = this.timer.gameTime
            }
        });

        this.ctx.canvas.addEventListener("mouseup", e => {
            that.down = false;
            this.click = false;
            // Stop dragging
            that.entities.forEach(entity => {
                if(entity.onMouseUp) entity.onMouseUp(e);
            });

             console.log("Mouse Up");  // Check if this is firing
        }, false);

        this.ctx.canvas.addEventListener("mousedown", (e) => {
            that.down = true;
            that.entities.forEach(entity => {
                if(entity.onMouseDown) entity.onMouseDown(e);
            });
        }, false);

        this.ctx.canvas.addEventListener("click", e => {
            this.click = true;
            that.entities.forEach(entity => {
                if (entity instanceof Faucet) {
                    entity.faucetManager(getXandY(e).x, getXandY(e).y);
                }
            });
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
            // console.log("Mouse Clicked");
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        document.body.addEventListener("dndDrop", e => {
            this.entities.forEach(entity => {
                if(entity.onDnDDrop) entity.onDnDDrop(e);
            });
        }, false);


        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);




        // that.leftclick = mouseClickListener;
        // this.ctx.canvas.addEventListener("click", that.leftclick, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw the entities in order
        for (let i = 0; i < this.entities.length; i++) {
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
            //If the size of the entity list has changed, update i
            if(entitiesCount !== this.entities.length) {
                let diff = entitiesCount - this.entities.length;
                entitiesCount = this.entities.length;
                i -= diff;
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