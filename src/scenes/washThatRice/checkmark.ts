import { ASSET_MANAGER } from "src/main";
import GameObject from "src/gameObject";
import GameEngine from "src/gameEngine";

export default class Checkmark extends GameObject{
    game: GameEngine
    ASSET_MANAGER: ASSET_MANAGER
    x: number
    y: number
    start: boolean
    show: boolean
    timeShown: number
    timesFlashed: number
    audioPlayed: boolean

    constructor(game: GameEngine, ASSET_MANAGER: ASSET_MANAGER, x: number, y: number) {
        super(game);
        this.game = game
        this.ASSET_MANAGER = ASSET_MANAGER
        this.x = x
        this.y = y
        this.start = false
        this.show = false
        this.timeShown = 0
        this.timesFlashed = 0
        this.audioPlayed = false
    }

    update() {
        if(this.game.win) {
            this.start = true
            if(!this.audioPlayed) {
                this.ASSET_MANAGER.playAsset('./assets/sounds/jingle.mp3')
                this.audioPlayed = true
            }
        }
        if (this.start && this.timesFlashed < 6) {
            this.timeShown++
            if (this.timeShown >= 20) {
                this.show = !this.show
                this.timeShown = 0
                this.timesFlashed++
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.show) {
            const WIDTH = 500
            const HEIGHT = 500
            ctx.drawImage(ASSET_MANAGER.getAsset('./assets/checkmark.png'), this.x - (WIDTH / 2), this.y - (HEIGHT / 2), WIDTH, HEIGHT);
        }
    }
}