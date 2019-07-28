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
        isNaN(per) && (per = 0);
        updateByPer(per);
    }

    function updateByPer (per) {
        renderCurTime(per);
        $('.pro-top').css({width: per*100 +'%'});
    }
    
    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time % 60;
        minute < 10 && (minute = '0' + minute);
        second < 10 && (second = '0' + second);
        if(isNaN(minute) || isNaN(second)) {
            return '00:00';
        }else {
            return minute + ':' + second
        }
    }

    root.proController = {
        init: init,
        updateByAudio: updateByAudio,
        updateByPer: updateByPer,
        updateBuffered: updateBuffered
    }
})(window.Zepto, window.player || (window.player={}))