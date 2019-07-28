(function ($, root) {
    var audio,
        timer = -1;
    function init(initAudio) {
        audio = initAudio;
        audio.addEventListener('durationchange', function () {
            renderAllTime();
        })
        audio.load();
    }
    
    function renderAllTime() {
        var time = formatTime(audio.duration);
        $('.all-time').html(time);
    }

    function renderCurTime (per) {
        var time = formatTime(per * audio.duration);
        $('.cur-time').html(time);
    }

    function updateBuffered() {
        var per = 0;
        function func() {
            if(audio.buffered.length) {
                per = audio.buffered.end(audio.buffered.length-1) / audio.duration;
                $('.pro-load').css({width: per*100 +'%'});
            }
            timer = requestAnimationFrame(func);
            per==1 && cancelAnimationFrame(timer);
        }
        func();
    }

    function updateByAudio() {
        var per = audio.currentTime / audio.duration;
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
        m < 10 && (m = '0' + m);
        s < 10 && (s = '0' + s);
        return m + ':' + s;
    }

    root.proController = {
        init: init,
        updateByAudio: updateByAudio,
        updateByPer: updateByPer,
        updateBuffered: updateBuffered
    }
})(window.Zepto, window.player || (window.player={}))