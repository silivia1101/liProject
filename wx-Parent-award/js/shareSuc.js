$(function(){
    Ajax();
    wxShare("test");
})
function Ajax(){
    $.ajax({
        "url": 'http://wx-parent.leo1v1.com/wx_parent_gift/set_identity_for_book',
        "type": "POST",
        "dataType": "jsonp",
        "data": {},
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
