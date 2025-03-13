import GameEngine from "src/gameEngine"
import GameObject from "src/gameObject.js"
import { ASSET_MANAGER } from "src/main.js"
import { getDistance } from "src/util.js"

export class PotTop extends GameObject {
    game: GameEngine
    x: number
    y: number

    constructor(game: GameEngine, x: number, y: number) {
        super(game);
        this.game = game
        this.x = x
        this.y = y
    }

    update() {
        if(this.game.timer.gameTime - this.game.previousMousePositionsLatest > 0.5) {
            this.game.previousMousePositions = []
            this.game.spinning = false
        }
        if(this.game.previousMousePositions.length === 15) {
            let avgPos = this.game.previousMousePositions.reduce((acc: {x: number, y: number}, curr: {x: number, y: number}) => {
                return {x: acc.x + curr.x, y: acc.y + curr.y}
            }, {x: 0, y: 0})
            avgPos.x /= 15
            avgPos.y /= 15

            if(getDistance(avgPos, {x: this.x, y: this.y}) > 250) {
                //console.log("too far")
                this.game.spinning = false
                return
            }

            //console.log(avgPos)

            let avgDist = this.game.previousMousePositions.reduce((acc: number, curr: {x: number, y: number}) => {
                return acc + Math.sqrt(Math.pow(curr.x - avgPos.x, 2) + Math.pow(curr.y - avgPos.y, 2))
            }, 0)
            avgDist /= 15

            //console.log(avgDist)

            if(avgDist < 200) {
                console.log("spinning")
                this.game.spinning = true
            } else {
                this.game.spinning = false
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const sprite = ASSET_MANAGER.getAsset('./assets/pot_top_outside.png') as HTMLImageElement;
        ctx.drawImage(sprite, this.x - ( sprite.width / 2), this.y - (sprite.height / 2));
    }
}

export class PotTopOutside extends GameObject {
    game: GameEngine
    x: number
    y: number

    constructor(game: GameEngine, x: number, y: number) {
        super(game)
        this.game = game
        this.x = x
        this.y = y
    }

    update() {
        
    }

    draw(ctx: CanvasRenderingContext2D) {
        
    }
}