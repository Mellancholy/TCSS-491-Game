class SceneManager {
    constructor(game){
        this.game = game;
        this.title = true;
    };

    // Method to play a transition video
    playTransitionVideo(src, x, y, width, height) {
        this.transitioning = true; // Set transitioning flag
        this.game.addVideo(src, x, y, width, height, true, false);

        // Listen for the video's end event to resume gameplay
        const video = document.querySelector('video');
        video.addEventListener('ended', () => {
            this.transitioning = false; // Transition complete
            video.remove(); // Remove the video from the DOM
        });
    }

    loadStation(station, transition, title) {
        this.title = title;
        if (transition) {
            // Play a transition video before loading the station
            this.playTransitionVideo('./sprites/title/TitleTransitionIn.mp4', 0, 0, 1024, 712);
            console.log("Transitioning");

            // Use a timeout to delay loading the station until the video ends
            setTimeout(() => {
                this.loadStation(station, false, title); // Load the station after the transition
            }, 5000); // Adjust the timeout to match the video's duration
        } else {
            if (station.stationType == "order") {
                this.game.addEntity(new OrderStationBg(this.game, 0, 0));
            } else if (station.stationType == "rice") {
                this.game.addEntity(new RiceStationBg(this.game, 0,0));
            } else if (station.stationType == "roll") {
                this.game.addEntity(new RollStationBg(this.game, 0, 0));
            } else if (station.stationType == "side") {
                this.game.addEntity(new SidesStationBg(this.game, 0, 0));
            }

            if (station.buttons) {
                this.game.addEntity(new Buttons(this.game, 0, 0))
            }
            
        }
    };

    update() {
        console.log("SceneManager Update");
        if (this.title) {
            if (this.game.click) {
                if (this.game.click.x >= 426 && this.game.click.x <= 598 && this.game.click.y >= 500 && this.game.click.y <= 564) {
                    this.loadStation(orderStation, true, false);
                }
            }
        } else if (this.game.click) {
            if (this.game.click.x >= 102 && this.game.click.x <= 274 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(orderStation);
            }
            if (this.game.click.x >= 318 && this.game.click.x <= 490 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(riceStation);
            }
            if (this.game.click.x >= 534 && this.game.click.x <= 706 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(rollStation);
            }
            if (this.game.click.x >= 750 && this.game.click.x <= 922 && this.game.click.y >= 636 && this.game.click.y <= 700) {
                this.loadStation(sideStation);
            }
        }
    };

    draw(ctx) {
        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title/Title.png"), 0, 0);
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/button/Start_Button.JPG"),  426, 500);
        }
    };

}