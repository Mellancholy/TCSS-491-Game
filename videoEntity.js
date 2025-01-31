class VideoEntity {
    constructor(src, x, y, width, height, autoplay = true, loop = false) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.autoplay = autoplay;
        this.loop = loop;
        this.video = null;
        this.removeFromWorld = false;
    }

    load() {
        this.video = document.createElement('video');
        this.video.src = this.src;
        this.video.autoplay = this.autoplay;
        this.video.loop = this.loop;
        this.video.muted = true; // Mute the video to allow autoplay in most browsers
        this.video.style.position = 'absolute';
        this.video.style.left = `${0}px`;
        this.video.style.top = `${0}px`;
        this.video.style.width = `${0}px`;
        this.video.style.height = `${0}px`;

        // Add the video to the DOM
        document.body.appendChild(this.video);
    }

    update() {
        // Update logic for the video (if needed)
    }

    draw(ctx) {
        // Draw the video onto the canvas (if needed)
        if (this.video && !this.video.paused && !this.video.ended) {
            ctx.drawImage(this.video, this.x, this.y, this.width, this.height);
        }
    }
}