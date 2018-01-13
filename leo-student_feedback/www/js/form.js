/**
 * Created by seven on 16-12-1.
 */

function geturl(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
};

$(function () {
    onFormStatusChange();
    $('.leo-form .form-btn').click(function () {
        sumitTrial($(this))
    });
    $("#code-span").click(sendCode);
    articleAjax();
})

function sumitTrial(node) {
    if (!netBtnEnable(node)) {
        return;
    }
    var node_phone = node.parent().find('.ele-phone')
    var node_code = node.parent().find('.ele-code')
 //   var node_subject = node.parent().find('.ele-subject')

    var phone = node_phone.val();
    var code = node_code.val();
//    var subject = node_subject.val()

    if (phone.length < 11) {
        node_phone.parent().parent().addClass('error')
        return;
    }else if (code.length < 2) {
        node_code.parent().parent().addClass('error')
        return;
    }

    setNetBtnStatus(node, '预约中...', 0);
    //  理优教育在线学习
    $.ajax({
	        url: '//wx-parent.leo1v1.com/wx_parent_common/book_free_lesson_with_code',
	        data: {
		        'type': 'zhishiku',
		        'phone': phone,
	            'p_phone': geturl("p_phone"),
		        'code':code
	        },
	        dataType: 'JSONP',
	        success: function (result) {
	            if (result['ret'] != 0) {
	                alert(result['info']);
	
	            } else {
	                alert("您已经成功预约免费课程");
	            }
	        },
	        error: function () {
	            alert("网络不太通畅，请稍后再试，或拨打咨询电话直接完成预约");
	        },
	        complete: function () {
	            setNetBtnStatus(node, '点击免费领取课程', 1);
	        }
	    });

}




//trigger: click 0 ,　after net 1
function setNetBtnStatus(node,txt,trigger){
    if(trigger == 0){
        if(node.attr('data-enable') == '0'){
            return;
        }else{
            node.addClass('leo-clicked');
            node.text(txt);
            node.attr('data-enable','0');
        }
    }else{
        node.removeClass('leo-clicked');
        node.text(txt);
        node.attr('data-enable','1');
    }

}

function netBtnEnable(node) {
    if(node.attr('data-enable') == '0'){
        return false;
    }else{
        return true;
    }
}

function onFormStatusChange() {
    $('.leo-form .input-txt, .leo-form select').focus(function () {
        $(this).parent().parent().removeClass('error').addClass('focus')
    })
    $('.leo-form .input-txt, .leo-form select').blur(function () {
        $(this).parent().parent().removeClass('focus')
    })
}

function scrollTo(top) {
    $('html,body').animate({scrollTop: top}, 800);
}

//当页面滚动到指定位置触发事件
function onNodeAppear(node, doFun) {
    var haveDone = false;
    $(window).scroll(function () {
        if(!haveDone){
            console.log("scroll")
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            if(windowHeight + scrollTop > node.offset().top){
                doFun();
                haveDone = true
            }
        }
    })
}


function codeTimer(countSec) {
    var codeInt =  setInterval(function () {
        if(countSec == 0){
            clearInterval(codeInt)
            $("#code-span").text('重新获取')
            $("#code-span").on('click',sendCode);
            return;
        }
        $("#code-span").text(countSec-- + '秒')
    },1000)
}

function sendCode() {
    var phone = $('.ele-phone').val()
    if (phone.length < 11) {
        $('.phone-container').addClass('error')
        return;
    }
    $("#code-span").off('click');
    $.ajax({
	        url: '//wx-parent.leo1v1.com/wx_parent_common/wx_send_phone_code',
	        data: {
	            'phone': phone,
	            'type': 'zhishiku'
	        },
	        dataType: 'JSONP',
	        success: function (result) {
	            if (result['ret'] != 0) {
	                $("#code-span").text("重新获取")
	                $("#code-span").on('click',sendCode);
	                alert(result['info']);
	            } else {
	                codeTimer(60)
	            }
	        },
	        error: function () {
	            alert("网络不太通畅，请稍后再试");
	            $("#code-span").on('click',sendCode);
	        }
	    });

}

