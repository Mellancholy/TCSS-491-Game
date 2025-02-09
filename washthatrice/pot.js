import { ASSET_MANAGER } from "../main.js"
import { getDistance } from "../util.js"

export class PotTop {

    constructor(game, x, y) {
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
            let avgPos = this.game.previousMousePositions.reduce((acc, curr) => {
                return {x: acc.x + curr.x, y: acc.y + curr.y}
            }, {x: 0, y: 0})
            avgPos.x /= 15
            avgPos.y /= 15

            if(getDistance(avgPos, {x: this.x, y: this.y}) > 250) {
                console.log("too far")
                this.game.spinning = false
                return
            }

            //console.log(avgPos)

            let avgDist = this.game.previousMousePositions.reduce((acc, curr) => {
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

    draw(ctx) {
        const WIDTH = 750
        const HEIGHT = 750
        const sprite = ASSET_MANAGER.getAsset('./assets/pot_top.png')
        ctx.drawImage(sprite, this.x - (WIDTH / 2), this.y - (HEIGHT / 2), WIDTH, HEIGHT);
    }
}

export class PotTopOutside {

    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
    }

    update() {
        
    }

    draw(ctx) {
        const WIDTH = 750
        const HEIGHT = 750
        const sprite = ASSET_MANAGER.getAsset('./assets/pot_top_outside.png')
        ctx.drawImage(sprite, this.x - (WIDTH / 2), this.y - (HEIGHT / 2), WIDTH, HEIGHT);
    }
}