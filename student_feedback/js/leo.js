/**
 * Created by seven on 16-12-1.
 */
//trigger: click 0 ,　after net 1
function setNetBtnStatus(node, txt, trigger) {
    if (trigger == 0) {
        if (node.attr('data-enable') == '0') {
            return;
        } else {
            node.addClass('leo-clicked')
            node.text(txt)
            node.attr('data-enable', '0')
        }
    } else {
        node.removeClass('leo-clicked')
        node.text(txt)
        node.attr('data-enable', '1')
    }
}
function netBtnEnable(node) {
    if (node.attr('data-enable') == '0') {
        return false;
    } else {
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
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    if (windowHeight + scrollTop > node.offset().top) {
        doFun()
    }
}
function wxShare(title, desc) {
    var weixinTitle = title;
    var weixinLink = window.location.href;
    var weixinImageUrl = "http://wx-parent-web.leo1v1.com/wx-invite-article/img/icon_yxyx.jpg";
    var weixinDesc = desc;
    $.ajax({
        "url": 'http://wx-parent.leo1v1.com/wx_parent_api/get_wx_tec_js_config?_parentid=50240',
        "type": "POST",
        "dataType": "jsonp",
        "data": {},
        async: true,
        success: function (result) {
            appId = result.appId;
            timestamp = result.timestamp;
            nonceStr = result.nonceStr;
            signature = result.signature;
            jsApiList = result.jsApiList;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: weixinTitle,
                    link: weixinLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    desc: weixinDesc, // 分享描述
                    imgUrl: weixinImageUrl, // 分享图标
                });
                wx.onMenuShareAppMessage({
                    title: weixinTitle, // 分享标题
                    link: weixinLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: weixinImageUrl, // 分享图标
                    desc: weixinDesc, // 分享描述
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                });
            });
        }
    });
}