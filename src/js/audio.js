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
            var duration = this.audio.duration;
            !isNaN(duration) && (this.audio.currentTime = per * duration);
        }
    }

    root.AudioManager = AudioManager;
    
})(window.Zepto, window.player || (window.player={}))