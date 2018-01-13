$(function(){
    var openid=geturl("openid");
    var type=geturl("type");
    var web_page_id=geturl("web_page_id");
    var from_adminid=geturl("from_adminid");
    Ajax(openid,type);
    wxShare(openid,type,web_page_id,from_adminid);
})
function Ajax(openid,type){
    // var openid=geturl("openid");
    // var type=geturl("type");
    // alert(openid);
    $.ajax({
        "url": 'http://wx-parent.leo1v1.com/wx_parent_gift/record_share',
        "type": "POST",
        "dataType": "jsonp",
        "data": {
            "openid":openid,
            "type":type
        },
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                alert(result['info']);
            } else {
                // 成功

            }
        }
    });
}
