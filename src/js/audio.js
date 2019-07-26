(function ($, root) {

    function AudioManager(src) {
        this.audio = new Audio();
        this.audio.src = src;
    }

    AudioManager.prototype = {
        play: function () {
            this.audio.play();
        },
        pause: function () {
            this.audio.pause();
        },
        togglePlay: function () {
            this.audio.paused ? this.play() : this.pause();
        },
        loadAudio: function (src) {
            this.audio.src = src;
        },
        playByPer: function (per) {
            this.audio.currentTime = per * this.audio.duration;
        }
    }

    root.AudioManager = AudioManager;

})(window.Zepto, window.player || (window.player={}))