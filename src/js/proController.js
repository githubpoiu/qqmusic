(function ($, root) {
    var duration,
        audio = root.audio,
        timer = -1;
    function init() {
        !audio && (audio = root.audio);
        duration = audio.duration;
        renderAllTime();
        audio.addEventListener('canplay', function () {
            duration = audio.duration;
            renderAllTime();
            updateBuffered();
        })
    }

    function renderAllTime() {
        var time = formatTime(duration);
        $('.all-time').html(time);
    }

    function renderCurTime (per) {
        var time = formatTime(per * duration);
        $('.cur-time').html(time);
    }

    function updateBuffered() {
        function func() {
            var per = 0;
            if(audio.buffered.length) {
                per = audio.buffered.end(0) / duration;
                $('.pro-load').css({width: per*100 +'%'});
            }
            timer = requestAnimationFrame(func);
            per==1 && cancelAnimationFrame(timer);
        }
        func();
    }

    function updateByAudio() {
        var per = audio.currentTime / duration;
        updateByPer(per);
    }

    function updateByPer (per) {
        renderCurTime(per);
        $('.pro-top').css({width: per*100 +'%'});
    }
    
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t % 60;
        m = m < 10 ? '0'+ m: m;
        s = s < 10 ? '0'+ s: s;
        return m + ':' + s;
    }
    root.proController = {
        init: init,
        updateByAudio: updateByAudio,
        updateByPer: updateByPer,
        updateBuffered: updateBuffered
    }
})(window.Zepto, window.player || (window.player={}))