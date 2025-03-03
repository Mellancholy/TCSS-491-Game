export default class Animator {
    spritesheet: HTMLImageElement;
    xStart: number;
    yStart: number;
    width: number;
    height: number;
    frameCount: number;
    frameDuration: number;
    elapsedTime: number;
    totalTime: number;
    
    constructor(spritesheet: HTMLImageElement | HTMLAudioElement, xStart: number, yStart: number, width: number, height: number, frameCount: number, frameDuration: number) {
        this.spritesheet = spritesheet as HTMLImageElement;
        this.xStart = xStart;
        this.yStart = yStart;
        this.width = width;
        this.height = height;
        this.frameCount = frameCount;
        this.frameDuration = frameDuration;

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick: number, ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width*frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width*2, this.height*2);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}