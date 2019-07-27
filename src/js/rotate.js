(function ($, root) {

    function Rotate() {
        this.deg = 0;
        this.timer = -1;
    }
    Rotate.prototype = {
        run: function (deg) {
            clearInterval(this.timer);
            var self = this;
            deg != undefined && (this.deg = deg);
            this.timer = setInterval(function () {
                $('.img-box').css({transform:'rotate('+self.deg+'deg)'});
                if(root.audio && root.audio.readyState == 4){
                    self.deg = (self.deg + .2) % 360;
                }
            },1000/60);
        },
        stop: function () {
            clearInterval(this.timer);
        }
    }

    root.rotate = new Rotate();

})(window.Zepto, window.player || (window.player = {}))