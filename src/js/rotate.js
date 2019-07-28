(function ($, root) {
    
    function Rotate() {
        this.deg = 0;
        this.timer = -1;
    }

    Rotate.prototype = {
        updateDeg: function() {
            $('.img-box').css({transform:'rotate('+this.deg+'deg)'});
            this.deg = (this.deg + .2) % 360;
        },
        setDeg: function (deg) {
            this.deg = deg;
        }
    }

    root.rotate = new Rotate();

})(window.Zepto, window.player || (window.player = {}))