(function ($, root) {
    
    function Rotate() {
        this.deg = 0;
        this.timer = -1;
    }

    Rotate.prototype = {
        updateDeg: function(deg) {
            deg != undefined && (this.deg = deg);
            $('.img-box').css({transform:'rotate('+this.deg+'deg)'});
            this.deg = (this.deg + .2) % 360;
        }
    }

    root.rotate = new Rotate();

})(window.Zepto, window.player || (window.player = {}))