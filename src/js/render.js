(function ($, root) {
    var renderDefaultImg = function () {
        var defaultImg = new Image();
        var src = '../image/default.gif';
        defaultImg.src = src;
        return function () {
            $('.img-box img').attr('src', src);
            root.blurImg(defaultImg, $('.wrapper'));
        }
    }();
    
    function renderImg(src) {
        renderDefaultImg();
        var img = new Image();
        img.onload = function () {
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('.wrapper'));
        }
        img.src = src;
    }

    function renderInfo(info) {
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
        renderImg(song.image);
        renderInfo(song, index);
        renderIsLike(song.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))