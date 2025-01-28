const COLORS = [
    '#f5f5f5',
    '#f8f8f8',
    '#fafafa',
    '#fcfcfc',
    '#ffffff',
    '#fefefe',
    '#fdfdfd',
    '#fbfbfb',
    '#f7f7f7',
    '#f4f4f4'
]

class RiceGrain {

    constructor(game, angle, distance, centerX, centerY) {
        this.game = game
        this.angle = angle
        this.distance = distance
        this.centerX = centerX
        this.centerY = centerY
        this.x = 0
        this.y = 0
        this.rotation = randomIntRange(0, Math.PI * 2)
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    }

    update() {
        if(this.game.spinning) {
            this.angle += Math.PI / 180
        }
        this.x = this.distance * Math.cos(this.angle) + this.centerX
        this.y = this.distance * Math.sin(this.angle) + this.centerY
    }

    draw(ctx) {
        //console.log(this.x, this.y)
        ctx.strokeStyle = 'black';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, 20, 4, this.rotation, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}