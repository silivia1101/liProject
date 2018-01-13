/**
 * 杞挱
 * @param  {[type]} $         [description]
 * @param  {[type]} window    [description]
 * @param  {[type]} document  [description]
 * @param  {[type]} undefined [description]
 * @return {[type]}           [description]
 * @author 鏈辨檽鑽� [zxhloves@126.com]
 */
$(function () {
    var Carousel = function (elem, options) {
        this.defaults = {curDisplay: 0, autoPlay: true, interval: 3000};
        this.opts = $.extend({}, this.defaults, options);

        var self = this;
        this.$carousel = elem;
        this.$aImg = this.$carousel.find('p');

        this.imgLen = this.$aImg.length;
        this.curDisplay = this.opts.curDisplay;
        this.autoPlay = this.opts.autoPlay;
        this.viewWidth = $(window).width() / 2;
        this.b_switch = true;
        this.iNow = this.opts.curDisplay;
        this.timer = null;
        this.interval = this.opts.interval;;
        // this.$aNav = this.$carousel.siblings('#bannerNav').find('ul li');
    };

    var outerWidth = parseInt($(window).width());
    var middleWidth = 200;
    // var _height = outerWidth >= middleWidth ? 260 : 150;
    // var _slideHeight = outerWidth >= middleWidth ? 230 : 120;

    Carousel.prototype = {
        play: function () {
            if (this.autoPlay) {
                if (this.iNow === this.imgLen - 1) {
                    this.iNow = 0;
                } else {
                    this.iNow ++;
                }

                this.movingNext(this.iNow);
            }
        },

        movingPrev: function (index) {
            this.curDisplay = index;

            this.initalCarousel();
        },

        movingNext: function (index) {
            this.curDisplay = index;

            this.initalCarousel();
        },

        initalCarousel: function () {
            var self = this;
            var half_imgLen = Math.floor(this.imgLen / 2);
            var leftNum, rightNum;

            var k = 0;
            for (var i = 0; i < half_imgLen; i++) {
                leftNum = this.curDisplay - i - 1;
                if(k == 0){
                    this.$aImg.eq(leftNum).css({
                        transform: 'translateX('+(-50 * (i + 1))+'px) translateZ(-60px) rotateY(10deg)'
                    }).animate({
                        // height: _slideHeight + 'px',
                        // marginTop: -_slideHeight/2 + 'px',
                        // opacity: '0.6'
                    }, 500);
                    // this.$aImg.eq(leftNum).attr('onclick', null);

                    rightNum = this.curDisplay + i + 1;
                    if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
                    this.$aImg.eq(rightNum).css({
                        transform: 'translateX('+(50 * (i + 1))+'px) translateZ(-60px) rotateY(-10deg)'
                    }).animate({
                        // height: _slideHeight + 'px',
                        // marginTop: -_slideHeight/2 + 'px',
                        // opacity: '0.6'
                    }, 500);
                    // this.$aImg.eq(rightNum).attr('onclick', null);
                    k++;
                }else {
                    this.$aImg.eq(leftNum).css({
                        transform: 'translateX(0px) translateZ(-100px) rotateY(10deg)'
                    });
                    rightNum = this.curDisplay + i + 1;
                    if (rightNum > this.imgLen - 1) rightNum -= this.imgLen;
                    this.$aImg.eq(rightNum).css({
                        transform: 'translateX(0px) translateZ(-100px) rotateY(-10deg)'
                    });
                }
                this.$aImg.removeClass('on');
                // this.$aNav.removeClass('on');
            }

            // var _href = 'location.href='+"'"+this.$aImg.eq(this.curDisplay).attr('data-url')+"'";
            this.$aImg.eq(this.curDisplay).css({
                transform: 'translateZ(0px)'
            }).animate({
                // height: _height + 'px',
                // marginTop: -_height/2 + 'px',
                // opacity: '1',
            }, 500);
            this.$carousel.on('webkitTransitionEnd', function () {
                self.b_switch = true;
            });
        },

        inital: function () {
            var self = this;

            this.initalCarousel();

            this.$aImg.on('click', function (ev) {
                if (self.b_switch && !$(this).hasClass('on')) {
                    self.iNow = $(this).index();
                    self.b_switch = false;

                    var direction = self.viewWidth < ev.clientX ? 'next' : 'prev';
                    var index = $(this).index();

                    if (direction === 'next') {
                        self.movingNext(index);
                    } else {
                        self.movingPrev(index);
                    }
                }
            }).hover(function () {
                clearInterval(self.timer);
            }, function () {
                self.timer = setInterval(function () {
                    self.play();
                }, self.interval);
            });
            this.timer = setInterval(function () {
                self.play();
            }, this.interval);

            this.$carousel.on('selectstart', function () {
                return false;
            });
        },
        constructor: Carousel
    };
    $.fn.carousel = function (options) {
        var carousel = new Carousel(this, options);
        return carousel.inital();
    };

});
window.onload=function(){
    var touch=true;
    if(touch){
        k_touch();
    }
    //触摸滑动模块
    function k_touch() {
        var _start = 0, _end = 0, _content = document.getElementById("slide");
        _content.addEventListener("touchstart", touchStart, false);
        _content.addEventListener("touchmove", touchMove, false);
        _content.addEventListener("touchend", touchEnd, false);
        function touchStart(event) {
            var touch = event.targetTouches[0];
            _start = touch.pageX;
        }
        function touchMove(event) {
            var touch = event.targetTouches[0];
            _end = (_start - touch.pageX);
        }
        function touchEnd(event) {
            if (_end < -100) {
                left();
                movingPrev();
                _end=0;
            }else if(_end > 100){
                right();
                movingNext();
                _end=0;
            }
        }
    }
}
