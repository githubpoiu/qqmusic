(function ($, root) {
    var renderLoading = function () {
        new Image().src = '../image/icon-pause.png';
        return function () {
            $('.img-box img').attr('src', '../image/default.gif');
            $('.wrapper').css('background-image', 'url(../image/bg.png)');
        }
    }();
    
    function renderImg(src) {
        var img = new Image();
        img.onload = function () {
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('.wrapper'));
        }
        img.src = src;
    }

    function renderInfo(info, index) {
        var temp = '<div class="title">'+info.song+'</div>\
                <div class="author">'+info.singer+'</div>';
        $('.song-info').html(temp);
        $('.song-item').removeClass('active').eq(index).addClass('active');
    }

    function renderIsLike(like) {
        if(like) {
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    function renderList (songList) {
        var str = '';
        $('.list-title').text('歌曲列表('+ songList.length +'首)');
        songList.forEach(function (item) {
            str += '<li class="song-item"><span class="song">'+item.song+'</span><span class="singer"> - '+item.singer+'</span></li>';
        });
        $('ul.list').html(str);
    }
    root.render = function(song, index, songList) {
        songList && renderList(songList);
        renderInfo(song, index);
        renderLoading();
        renderImg(song.image);
        renderIsLike(song.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))