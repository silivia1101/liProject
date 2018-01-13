$(function(){
	
    var title = "理优1对1—中小学在线提分专家";
//  var weixinImageUrl = "//www.leo1v1.com/yxyx/img/banner.png";
    var pic = "http://wx-yxyx-web.leo1v1.com/wx_yxyx_leo-Introduction/img/banner.png";
    var des = "理优1对1专注于初高中在线1对1实时教学，强大教学团队经验丰富，帮助更多学生改变未来！";
	wxShare(pic,title,des);
});
function wxShare(pic,title,content) {
    var weixinTitle = title;
    // var weixinLink = 'http://wx-parent-web.leo1v1.com/anniversary_day/index.html';
    var weixinLink = window.location.href;
    var weixinImageUrl = pic;
    var weixinDesc = content;
    //var parentid = geturl('parentid');
    $.ajax({
        "url": 'http://wx-yxyx.leo1v1.com/wx_yxyx_common/get_wx_yxyx_js_config',
        "type": "POST",
        "dataType": "jsonp",
        "data": {},
        async:true,
        success: function(result) {
           // alert("优学优享")
           // alert(JSON.stringify(result))
            appId = result.appId;
            timestamp = result.timestamp;
            nonceStr = result.nonceStr;
            signature = result.signature;
            jsApiList=result.jsApiList;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: weixinTitle,
                    link: weixinLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    desc: weixinDesc, // 分享描述
                    imgUrl: weixinImageUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        //alert("onMenuShareTimeline suc")
                    },
                    fail: function () {
                        // 用户确认分享后执行的回调函数
                        //alert("onMenuShareTimeline fail")
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    title: weixinTitle, // 分享标题
                   // desc: weixinDesc, // 分享描述
                    link: weixinLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: weixinImageUrl, // 分享图标
                    desc: weixinDesc, // 分享描述
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                       // alert("onMenuShareAppMessage suc")
                    },
                    fail: function () {
                        // 用户确认分享后执行的回调函数
                       // alert("onMenuShareAppMessage fail")
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                       // alert("onMenuShareAppMessage cancel")
                    }
                });
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res){
                //alert("error")

                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    });
}