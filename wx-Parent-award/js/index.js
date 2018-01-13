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
                    var strHtml="<section class='bg1'>\n" +
                        "    <img src='img/bg1.png' alt=''>\n" +
                        "    <button class='btn1' onclick='getLoc()'></button>\n" +
                        "</section>";
                    $("#container").html(strHtml);
                    AjaxFunc();
                }else{
                    window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/shareSuc.html";
                }
            }
        }
    });

// http://admin.leo1v1.com/common_new/web_page_log?
}


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

function geturl(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
};
function getLoc(){
    window.location.href="http://wx-parent-web.leo1v1.com/wx-Parent-award/share.html";
}