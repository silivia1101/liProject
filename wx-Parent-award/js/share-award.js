/**
 * Created by LE on 2017/10/24.
 */

$(function (){

    var jsonArr=["恭喜张**获得300元超市购物卡！",
        "恭喜王**获得80元学习套装文具！",
        "恭喜璇**获得799元高级乳胶记忆护颈，太赞了！！！",
        "恭喜米**获得50元手机充值卡！",
        "恭喜未**获得名著读物三件套"];
    var indexNum=0;
    $(".marqueeDiv").html("<marquee>"+jsonArr[indexNum]+"</marquee>");
    indexNum++;
    setInterval(function(){
        if(indexNum<jsonArr.length){
            $(".marqueeDiv").html("<marquee>"+jsonArr[indexNum]+"</marquee>");
            indexNum++;
        }else if(indexNum>=jsonArr.length){
            indexNum=0;
            $(".marqueeDiv").html("<marquee>"+jsonArr[indexNum]+"</marquee>");
        }
    },8000);

    var rotateTimeOut = function (){
        $('#rotate').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;
    var rotateFn = function (awards, angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle:0,
            animateTo:angles+1800,
            duration:8000,
            callback:function (){
                // alert(txt);
                // bRotate = !bRotate;
                window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/share-award-suc.html";
            }
        })
    };
    $('.btn2').click(function (){
        if(bRotate)return;
        var item = 5;
        switch (item) {
            case 0:
                //var angle = [26, 88, 137, 185, 235, 287, 337];
                rotateFn(0, 350, '一等奖');
                break;
            case 1:
                //var angle = [88, 137, 185, 235, 287];
                rotateFn(1, 290, '二等奖');
                break;
            case 2:
                //var angle = [137, 185, 235, 287];
                rotateFn(2, 230, '三等奖');
                break;
            case 3:
                //var angle = [137, 185, 235, 287];
                rotateFn(3, 170, '四等奖');
                break;
            case 4:
                //var angle = [185, 235, 287];
                rotateFn(4, 110, '五等奖');
                break;
            case 5:
                //var angle = [185, 235, 287];
                var num=rnd();
                rotateFn(5, num, '幸运奖');
                break;
        }
        console.log(item);
    });
});
function rnd(){
    // return 0;
    return Math.random() * (60 - 5) + 5;
}