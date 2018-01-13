
$(function () {
    var str="<img src='img/bg2.png'>";
    $("section").html(str);
    var openid=geturl("openid");
    var type=geturl("type");
    var web_page_id=geturl("web_page_id");
    var from_adminid=geturl("from_adminid");
    wxShare(openid,type,web_page_id,from_adminid);
    // $("img").click(function (){
    //     getFunc();
    // });
})
// $(".btn2").click=function(){
// $(".box .inner").click();
// }
// function getFunc(){
//     window.location.href="shareSuc.html";
// }


