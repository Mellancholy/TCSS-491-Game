import GameObject from "src/gameObject.js";

export default class TimerBar extends GameObject {
    constructor(gameEngine, totalTime) {
        super(gameEngine);
        this.gameEngine = gameEngine;
        this.totalTime = totalTime; 
        this.elapsedTime = 0; 
        this.isCooking = false; 
        this.isDone = false; 
        this.result = null; 

        
        this.perfectStart = this.totalTime * 0.8;
        this.perfectEnd = this.totalTime;

        this.x = 237; // X 
        this.y = 650; // Y 
        this.width = 550; // Width 
        this.height = 20; // Height
    }

    
    start() {
        if (!this.isCooking && !this.isDone) {
            this.isCooking = true;
            this.elapsedTime = 0;
            this.result = null;
            //console.log("TimerBar started!"); 
        }
    }

    
    stop() {
        if (this.isCooking) {
            this.isCooking = false;
            this.isDone = true;

            // Determine the result based on elapsed time
            if (this.elapsedTime < this.perfectStart) {
                this.result = "undercooked";
            } else if (this.elapsedTime >= this.perfectStart && this.elapsedTime <= this.perfectEnd) {
                this.result = "perfect";
                const currentData = this.game.addSharedData("riceCooker");
                const newAmount = currentData ? currentData.amount + 5 : 5;
                this.game.addSharedData("riceCooker", {amount: newAmount});
                setTimeout(() => {
                    this.game.sceneManager.loadScene("rice")
                }
                , 2000)
            } else {
                this.result = "overcooked";
            }

            //console.log(`Cooking stopped! Result: ${this.result}`); 
        }
    }

    update() {
        if (this.isCooking) {
            this.elapsedTime += this.gameEngine.clockTick;

            // Automatically stop if time exceeds totalTime
            if (this.elapsedTime >= this.totalTime) {
                this.stop();
            }
        }
    }

    draw(ctx) {
        
        ctx.fillStyle = "lightgray";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        
        const progressWidth = (this.elapsedTime / this.totalTime) * this.width;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, progressWidth, this.height);

        
        const perfectStartX = this.x + (this.perfectStart / this.totalTime) * this.width;
        const perfectEndX = this.x + (this.perfectEnd / this.totalTime) * this.width;
        ctx.fillStyle = "rgba(0, 255, 0, 0.3)"; // Semi-transparent green
        ctx.fillRect(perfectStartX, this.y, perfectEndX - perfectStartX, this.height);

        
        if (this.isDone) {
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.fillText(`Result: ${this.result}`, this.x, this.y + this.height + 20);
        }
    }
}