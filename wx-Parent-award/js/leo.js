
function wxShare(indexLink) {
    var weixinTitle = "100%中奖送福利！超市购物卡、手机充值卡、套装文具等价值百元好礼等您来领取！拼人品的时候来了！";
    var weixinLink = "http://wx-parent-web.leo1v1.com/wx-Parent-award/index.html";
    var weixinImageUrl = "http://wx-parent-web.leo1v1.com/wx-Parent-award/img/wxshare.png";
    var weixinDesc = "100%中奖！";
    $.ajax({
        "url": 'http://wx-parent.leo1v1.com/wx_parent_api/get_wx_tec_js_config?_parentid=50240',
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
                        // window.location.href="shareSuc.html";
                        // alert(indexLink);
                        if(indexLink=="share"){
                            window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/share-award.html";
                        }else if(indexLink=="test"){
                            window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/shareSuc.html";
                        }
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
                        // alert("成功");
                        // window.location.href="shareSuc.html";
                        // alert(indexLink);
                        if(indexLink=="share"){
                            window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/share-award.html";
                        }else if(indexLink=="test"){
                            window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/shareSuc.html";
                        }
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