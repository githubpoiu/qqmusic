var root = window.player;
var render = root.render;
var rotate = root.rotate;
var proController = root.proController;
var audioManager = null;
var audio = null;
var songList = [];
var index = 0;
var len = 0;
var frameTimer = -1;
// 获取数据
function getData(url) {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            songList = data;
            index = 0;
            len = songList.length;
            render(songList[0], index, songList);
            audioManager = new root.AudioManager(songList[index].audio);
            root.audio = audio = audioManager.audio;
            proController.init(audio);
            bindEvent();
        },
        error: function () {
            console.log('error');
        }
    })
}

getData('/source/data.json');

window.onload = function () {
    setTimeout(function () {$('.loading').hide();},800)
}

function bindEvent() {
    // 进度条事件
    var pro = $('.pro-bottom').offset();
    var left = pro.left;
    var width = pro.width;
    // 获取当前的百分比
    function getCurPer (e) {
        //click: e.clientX  touchend: e.changedTouches[0].clientX
        var clientX = e.clientX || e.changedTouches[0].clientX;
        var per = (clientX - left) / width;
        per < 0 && (per = 0);
        per > 1 && (per = 1);
        return per;
    }
    // 点击进度条更改进度(谷歌不支持首次touch事件播放音乐)
    $('.pro-box').on('click', function (e, event) {
        e = event || e;
        var per = getCurPer(e);
        audioManager.playByPer(per);
        if(audio.ended){
            $('.next').trigger('click');
        }else {
            audioManager.play();
        }
        playStatusChangeHandle();
    })
    //拖动进度点更改进度
    $('.spot').on('touchstart', function (e) {
        audioManager.pause();
        playStatusChangeHandle();
        return false;
    }).on('touchmove', function (e) {
        var per = getCurPer(e);
        proController.updateByPer(per);
    }).on('touchend', function (e) {
        // e与$('.pro-box')e类型不一致
        $('.pro-box').trigger('click', e);
    })
    
    // 根据音乐播放驱动进度条
    function startRun() {
        stopRun();
        function run() {
            proController.updateByAudio();
            audio.readyState >= 3 && rotate.updateDeg();
            audio.ended && $('.next').trigger('click');

            frameTimer = requestAnimationFrame(run);
        }
        run();
    }
    // 停止驱动进度条
    function stopRun() {
        cancelAnimationFrame(frameTimer);
    }
    // 根据播放状态集中改变相关逻辑
    function playStatusChangeHandle(config) {
        var deg;
        config && (deg = config.deg);
        if(audio.paused) {
            stopRun();
            $('.play').removeClass('playing');
        }else{
            startRun();
            $('.play').addClass('playing');
            deg != undefined && rotate.updateDeg(0);
        }
    }
    // 按钮事件
    // 切换播放
    $('.play').on('click', function () {
        audioManager.togglePlay();
        playStatusChangeHandle();
    })
    // 上一首
    $('.prev').on('click', function () {
        index = (index - 1 + len) % len;
        switchSong();
    })
    // 下一首
    $('.next').on('click', function () {
        index = (index + 1) % len;
        switchSong();
    })
    // 显示列表
    $('.btn.list').on('click', function () {
        $('.song-list').addClass('show');
    })
    // 关闭列表
    $('.close').add('.song-list').on('click', function () {
        $('.song-list').removeClass('show');
    })
    // 阻止点击事件冒泡父级,list关闭
    $('.list-box').on('click', function () {
        return false;
    })
    // 列表点击切换歌曲
    $('.song-item').on('click', function (e) {
        index = $(this).index();
        switchSong();
    })
    // 切换歌曲
    function switchSong () {
        render(songList[index], index);
        audioManager.loadAudio(songList[index].audio);
        audio.play();
        proController.updateBuffered();
        playStatusChangeHandle({deg:0});
    }
}