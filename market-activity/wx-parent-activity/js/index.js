/**
 * Created by seven on 16-12-1.
 */
// http://wx-parent.leo1v1.com/wx_parent_gift/get_share_num
$(function(){
    // 判断是否查看
    AjaxFunc();
    console.log(test);
    var str="<img src='img/bg1.png' onclick='getLoc()'>";
    $(".bg1").html(str);
})
// 是否阅读
function AjaxFunc(){
	$.ajax({
        "url":'http://admin.leo1v1.com/common_new/web_page_log',
        "type": "post",
        "dataType": "jsonp",
        "data": {
        	"web_page_id":geturl("web_page_id"),
        	"from_adminid":geturl("from_adminid")
        },
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
//	                alert(result['info']);
            } else {
                // 成功
            }
        }
    });

}

function getLoc(){
    var openid=geturl('openid');
    var type=geturl('type');
    var web_page_id=geturl("web_page_id");
    var from_adminid=geturl("from_adminid");
    // alert("type="+type);
    window.location.href="share.html?openid="+openid+"&type="+type+"&web_page_id="+web_page_id+"&from_adminid="+from_adminid;
    // window.location.href="http://wx-parent-web.leo1v1.com/wx-activity-book/share.html?openid="+openid+"&type="+type+"&web_page_id="+web_page_id+"&from_adminid="+from_adminid;
}