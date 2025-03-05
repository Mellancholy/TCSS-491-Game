import Timer from "./timer.js";
import Faucet from "./scenes/fillThePot/faucet.js";
import SceneManager from "./sceneManager.js";
import Scene from "./scene.js";
import GameObject from "./gameObject.js";
import HUD from "./hud/hud.js";


// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

export default class GameEngine {
    ctx: CanvasRenderingContext2D | null;
    entities: any[];
    persistentGameObjects: {[key: string]: any};
    click: { x: number, y: number } | null;
    mouse: { x: number, y: number } | null;
    move: { x: number, y: number } | null | undefined;
    down: boolean | null;
    previousMousePositionsDelay: number;
    previousMousePositionsDelayCounter: number;
    previousMousePositions: { x: number, y: number }[];
    previousMousePositionsLatest: number;
    wheel: WheelEvent | null;
    keys: {[key: string]: boolean};
    options: { debugging: boolean };
    sceneManager: SceneManager | null;
    currentScene: Scene | null;
    hud: HUD | null;
    sharedData: {[key: string]: any};
    timer: Timer | undefined;
    running: boolean | undefined;
    rightclick: { x: number; y: number; } | undefined;
    clockTick: number | undefined;


    constructor(options: { debugging: boolean } | null) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        this.persistentGameObjects = {};

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



        // Options and the Details
        this.options = options || {
            debugging: false,
        };

        this.sceneManager = null;
        this.currentScene = null;
        this.hud = null;
        this.sharedData = {};
    };

    init(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            // @ts-expect-error
            requestAnimFrame(gameLoop, this.ctx!.canvas);
        };
        gameLoop();
    };

    startInput() {
        var getXandY = (e: MouseEvent) => {
            let bounds = this.ctx!.canvas.getBoundingClientRect();
            let scaleX = this.ctx!.canvas.width / bounds.width;
            let scaleY = this.ctx!.canvas.height / bounds.height;

            let x = (e.clientX - bounds.left) * scaleX;
            let y = (e.clientY - bounds.top) * scaleY;

            return { x: x , y: y };
        }
        
        this.ctx!.canvas.addEventListener("mousemove", e => {
            this.move = getXandY(e);
            // if (this.options.debugging) {
            //     console.log("MOUSE_MOVE", getXandY(e));
            // }
            this.mouse = getXandY(e);
            this.previousMousePositionsDelayCounter++;

            if(this.previousMousePositionsDelayCounter >= this.previousMousePositionsDelay) {
                if (this.previousMousePositions.length >= 15) {
                    this.previousMousePositions.shift();
                }
                this.previousMousePositions.push(this.mouse);
                this.previousMousePositionsDelayCounter = 0;
                this.previousMousePositionsLatest = this.timer!.gameTime
            }
        });

        this.ctx!.canvas.addEventListener("mouseup", e => {
            const realCoords = getXandY(e);
            const modifiedEvent = {
                ...e,
                x: realCoords.x,
                y: realCoords.y,
            } as MouseEvent;
            this.down = false;
            // Stop dragging
            this.entities.forEach(entity => {
                if(entity.onMouseUp) entity.onMouseUp(modifiedEvent);
            });

            //console.log("Mouse Up");  // Check if this is firing
        }, false);

        this.ctx!.canvas.addEventListener("mousedown", (e) => {
            const realCoords = getXandY(e);
            const modifiedEvent = {
                ...e,
                x: realCoords.x,
                y: realCoords.y,
            } as MouseEvent;
            this.down = true;
            this.entities.forEach(entity => {
                if(entity.onMouseDown) entity.onMouseDown(modifiedEvent);
            });
            if(this.options.debugging) {
                this.addEntity(new Point(this, modifiedEvent.x, modifiedEvent.y));
            }
        }, false);

        this.ctx!.canvas.addEventListener("click", e => {
            this.entities.forEach(entity => {
                if (entity instanceof Faucet) {
                    entity.faucetManager(getXandY(e).x, getXandY(e).y);
                }
            });
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
                console.log(e)
            }
            this.click = getXandY(e);
            // console.log("Mouse Clicked");
        });

        this.ctx!.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                //@ts-ignore
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx!.canvas.addEventListener("contextmenu", e => {
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


        this.ctx!.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx!.canvas.addEventListener("keyup", event => this.keys[event.key] = false);




        // that.leftclick = mouseClickListener;
        // this.ctx.canvas.addEventListener("click", that.leftclick, false);
    };

    addEntity(entity: any) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);

        // Draw the entities in order
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        // console.log(this.entities);
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
        this.clockTick = this.timer!.tick();
        this.update();
        this.draw();
    };

    getSceneManager(): SceneManager {
        if(!this.sceneManager) {
            throw new Error("SceneManager is not initialized");
        }
        return this.sceneManager;
    }

    getHUD(): HUD {
        if(!this.hud) {
            throw new Error("HUD is not initialized");
        }
        return this.hud;
    }

    getSharedData() {
        return this.sharedData;
    }

    getSharedDataByKey(key: string) {
        return this.sharedData[key];
    }
    
    getSharedDataByKeyAndDefault(key: string, defaultValue: object) {
        if (this.sharedData[key] === undefined) {
            return defaultValue;
        }
        return this.sharedData[key];
    }
    addSharedData(key: string, value: object) {
        this.sharedData[key] = {...value};
    }

    removeSharedDataByKey(key: string) {
        delete this.sharedData[key];
    }

    registerPersistentGameObject(id: string, gameObject: GameObject) {
        this.persistentGameObjects[id] = gameObject;
    }

    getPersistentGameObject(id: string) {
        return this.persistentGameObjects[id];
    }

    removePersistentGameObject(id: string) {
        delete this.persistentGameObjects[id];
    }
    
    clearPersistentGameObjects() {
        this.persistentGameObjects = {};
    }
};

class Point extends GameObject {
    x: number;
    y: number;
    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.x = x;
        this.y = y;
    }
    update() {
        
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 5, 5);
    }
}