export default class AssetManager {
    successCount: number;
    errorCount: number;
    cache: { [key: string]: HTMLImageElement | HTMLAudioElement };
    downloadQueue: string[];

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = {};
        this.downloadQueue = [];
    };

    queueDownload(path: string) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback: () => void) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);
            var ext = path.substring(path.length - 3).toLowerCase();

            switch (ext) {
                case 'jpg':
                case 'png':
                    var img = new Image();
                    img.addEventListener("load", function () {
                        console.log("Loaded " + this.src);
                        that.successCount++;
                        if (that.isDone()) callback();
                    });

                    img.addEventListener("error", function () {
                        console.log("Error loading " + this.src);
                        that.errorCount++;
                        if (that.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;
                case 'wav':
                case 'mp3':
                case 'mp4':
                    var aud = new Audio();
                    aud.addEventListener("loadeddata", function () {
                        console.log("Loaded " + this.src);
                        that.successCount++;
                        if (that.isDone()) callback();
                    });

                    aud.addEventListener("error", function () {
                        console.log("Error loading " + this.src);
                        that.errorCount++;
                        if (that.isDone()) callback();
                    });

                    aud.addEventListener("ended", function () {
                        aud.pause();
                        aud.currentTime = 0;
                    });

                    aud.src = path;
                    aud.load();

                    this.cache[path] = aud;
                    break;
            }
        }
    };

    getAsset(path: string) {
        return this.cache[path];
    };

    playAsset(path: string) {
        let audio = this.cache[path] as HTMLAudioElement;
        if (!audio) {
            console.error(`Audio asset not found: ${path}`);
            return;
        }
    
        if (audio.loop) {
            // If this is the background music, don't clone it, just ensure it's playing
            if (audio.paused) {
                audio.play().catch(err => console.warn("Autoplay blocked:", err));
            }
            return;
        }

        // Clone sound effect for multiple overlapping plays
        let clone = audio.cloneNode() as HTMLAudioElement;
        clone.currentTime = 0;
        clone.volume = audio.volume;
        clone.play();
    };

    playBackgroundMusic(path: string) {
        let bgm = this.cache[path] as HTMLAudioElement;
        if (!bgm) {
            console.error(`Background music not found: ${path}`);
            return;
        }
        bgm.loop = true; // Ensure looping
        if (bgm.paused) {
            bgm.currentTime = 0; // Start from the beginning if it was paused
            bgm.play().catch(err => console.warn("Autoplay blocked:", err));
        }
    }
    

    muteAudio(mute: boolean) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.muted = mute;
            }
        }
    };

    adjustVolume(volume: number) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        }
    };

    pauseBackgroundMusic() {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.pause();
                asset.currentTime = 0;
            }
        }
    };

    autoRepeat(path: string) {
        var aud = this.cache[path] as HTMLAudioElement;
        aud.addEventListener("ended", function () {
            aud.play();
        });
    };
};

