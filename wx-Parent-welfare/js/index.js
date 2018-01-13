/**
 * Created by seven on 16-12-1.
 */
// http://wx-parent.leo1v1.com/wx_parent_gift/get_share_num
$(function(){
    Ajax();
})
// var desUrl=encodeURI('http://wx-parent.leo1v1.com/wx_parent_gift/check_identity_for_book');
// var mathNum=Math.round(1000/10);
function Ajax(){
    $.ajax({
        // "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx636f1058abca1bc1&redirect_uri="+desUrl+"&response_type=code&no="+mathNum+"&scope=snsapi_userinfo&state=STATE_$no&connect_redirect=1#wechat_redirect",
        "url":'http://wx-parent.leo1v1.com/wx_parent_gift/check_identity_for_book',
        "type": "get",
        "dataType": "jsonp",
        "data": {},
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                alert(result['info']);
            } else {
                // 成功
                if(result.share_num==0){
                    var strHtml="<section>\n" +
                        "    <img src='img/bg1.png' alt=''>\n" +
                        "    <button onclick='getLoc()'>立即领取</button>\n" +
                        "</section>";
                    $("#container").html(strHtml);
                }else{
                    window.location.href="//wx-parent-web.leo1v1.com/wx-Parent-welfare/shareSuc.html";
                }
            }
        }
    });
}
function getLoc(){
    window.location.href="//wx-parent-web.leo1v1.com/wx-Parent-welfare/share.html";
}