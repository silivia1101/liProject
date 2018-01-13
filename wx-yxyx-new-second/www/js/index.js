
apiready = function(){
    api.parseTapmode();
}

$(function(){
    Ajax();
    AjaxUser();
    createHtml();
})

// 广播条
function Ajax(){
    $.ajax({
        "url": baseUrl+'wx_yxyx_common/top_invite_list'+userId,
        "type": "POST",
        "dataType": "jsonp",
        "data": {},
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                // alert(result['info']);
                $api.remove($api.byId("tips-1"));

                // $("#tips-1").css("display","none")
            } else {
                // 反馈成功
                if(result.list.length!=0){
                    var strTip="<img src='img/index/img1.svg' alt=''>"+
                        "<div class='aui-tips-title'></div>"+
                        "<img src='img/index/img1-2.svg' onclick='closeTips()'>";
                    // "<i class='aui-iconfont aui-icon-close' tapmode onclick='closeTips()'></i>";
                    $(".aui-tips").html(strTip);
                    setTimeInterval(result);
                }else{

                }
            }
        },
        error: function () {
            alert("网络不太通畅，请稍后再试");
        }
    });
}
var index=0,indexTip=0;
function setTimeInterval(result){
    if(index==0){
        marTip(result);
    }else{
        setInterval(function(){
            marTip(result);
        },8000);
    }
}
function marTip(result){
    if(index==0){
        index++;
        marqueeHtml(result);
        indexTip=indexTip+1;
        setTimeInterval(result);
    }else{
        if(indexTip<=result.list.length-1){
            // 广播条
            marqueeHtml(result);
            indexTip=indexTip+1;
        }else if(indexTip>result.list.length-1){
            indexTip=0;
            marqueeHtml(result);
        }
    }
}
function marqueeHtml(result){
    var tTime=parseDate(result.list[indexTip].create_time);
    var strTip="<marquee>"+result.list[indexTip].from_nick+"于"+tTime+"成功邀请了"+result.list[indexTip].new_nick+"</marquee>";
    $(".aui-tips-title").html(strTip);
}
// 用户信息
function AjaxUser(){
    $.ajax({
        "url": baseUrl+'wx_yxyx_api/get_user_center_info'+userId,
        "type": "POST",
        "dataType": "jsonp",
        "data": {},
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                // alert(result['info']);
                window.location.href="login.html";
            } else {
                // 反馈成功
                buildingHtml(result);
            }
        },
        error: function () {
            alert("网络不太通畅，请稍后再试");
        }
    });
}
var p_phone="",wx_openid="";
// 动态页面
function buildingHtml(result){
    // 用户信息
    $(".header-user-sibling").css({'backgroundImage':'url('+result.user_info_list.wx_headimgurl+')','opacity': 0.3,'backgroundPosition':'center','backgroundSize':'cover'});
    var strImg;
    if(result.user_info_list.agent_level_str=="水晶会员"){
        strImg="<img onclick='memberFunc(2)' src='img/index/img-diamond.svg' alt=''>";
    }
    else if(result.user_info_list.agent_level_str=="黄金会员" && result.user_info_list.test_lesson_succ_flog==1){
        strImg="<img onclick='memberFunc(11)' src='img/index/img-gold.svg' alt=''>";
    }
    else if(result.user_info_list.agent_level_str=="黄金会员" && result.user_info_list.test_lesson_succ_flog==0){
        strImg="<img onclick='memberFunc(1)' src='img/index/img-gold.svg' alt=''>";
    }
    var strHeaderUser="<div class='btn userTip' data-toggle='modal' data-target='#myModal'>"+
            // "<img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img2.svg' alt=''>"+
            // "邀请规则"+
        "</div>"+
        "<div class='userImg'>"+
            // "<img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img3.png' alt=''>"+
            "<img src='"+result.user_info_list.wx_headimgurl+"' alt=''>"+
        "</div>"+
            "<div class='userName'>"+result.user_info_list.usernick+"</div>"+
            "<div  class='userTitle'>"+strImg+"</div>";
// <i class='aui-iconfont aui-icon-right'></i>
            // "黄金会员"+
        // "<img src='img/index/img3-1.svg' id='1' />"+
    $(".header-user").html(strHeaderUser);
    var strMine="<h3>邀请详情</h3>"+
        "<div class='totalNum'>"+
        "<dl class='total-left' onclick='memberFunc(3)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second//img/index/img4.svg' alt=''></dt>"+
        "<dd>"+
        "<p class='total-left-mine'>我的收入</p>"+
        "<p class='total-left-money'>"+result.user_info_list.all_money+"元</p>"+
    "</dd>"+
    "</dl>"+
    "<dl class='total-right' onclick='memberFunc(4)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img5.svg' alt=''></dt>"+
        "<dd>"+
        "<p class='total-right-invite'>邀请个数</p>"+
        "<p class='total-right-count'>"+result.user_info_list.child_all_count+"个</p>"+
    "</dd>"+
    "</dl>"+
    "</div>";
    $(".mine").html(strMine);
    p_phone=result.user_info_list.phone;
    wx_openid=result.user_info_list.wx_openid;
}
function createHtml(){
    var strCreate="<h3>热门活动</h3>"+
        "<div class='totalNum'>"+
        "<dl class='total-left dl-bottom hotActivity col-xs-4' onclick='memberFunc(5)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img6.svg' ></dt>"+
        "<dd>"+
        "邀请学员"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-left dl-bottom col-xs-4' onclick='memberFunc(6)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img7.svg'></dt>"+
        "<dd>"+
        "邀请会员"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-right dl-bottom col-xs-4' onclick='memberFunc(7)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img8.svg'></dt>"+
        "<dd>"+
        "每日抽奖"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-left col-xs-4' onclick='memberFunc(8)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img9.svg' alt=''></dt>"+
        "<dd>"+
        "更多活动"+
        "</dd>"+
        "</dl>"+
        "</div>";
    $(".activity").html(strCreate);
    var strCre="<h3>理优简介</h3>"+
        "<div class='totalNum'>"+
        "<dl class='total-left dl-bottom col-xs-4' onclick='memberFunc(91)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img10.svg'></dt>"+
        "<dd>"+
        "理优教育"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-left dl-bottom col-xs-4' onclick='memberFunc(92)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img11.svg'></dt>"+
        "<dd>"+
        "精品内容"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-right dl-bottom col-xs-4' onclick='memberFunc(93)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img12.svg'></dt>"+
        "<dd>"+
        "学员反馈"+
        "</dd>"+
        "</dl>"+
        "<dl class='total-left col-xs-4' onclick='memberFunc(94)'>"+
        "<dt><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/index/img13.svg'></dt>"+
        "<dd>"+
        "预约试听"+
        "</dd>"+
        "</dl>"+
        "</div>";
    $(".leoIntroduce").html(strCre);
}
// 关闭广播条
function closeTips(){
    $api.remove($api.byId("tips-1"));
}
// 弹出框
function tipFunc(){
    var strMsg="<div class='aui-tab' id='tab'>"+
        "<div class='aui-tab-item aui-active'>邀请规则</div>"+
        "<div class='aui-tab-item'>常见问题</div>"+
    "</div>"+
    "<div class='tab-left'>"+
        // "<img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/img-left.png' alt=''>"+
        "<ul>"+
            "<li>1、成功邀请学员，获得5元奖励</li>"+
            "<li>2、成功邀请学员，获得5元奖励</li>"+
            "<li>3、成功邀请学员，获得5元奖励</li>"+
            "<li>4、成功邀请学员，获得5元奖励</li>"+
            "<li>5、成功邀请学员，获得5元奖励</li>"+
            "<li>6、成功邀请学员，获得5元奖励</li>"+
            "<li>7、成功邀请学员，获得5元奖励</li>"+
            "<li>8、成功邀请学员，获得5元奖励</li>"+
            "<li>9、成功邀请学员，获得5元奖励</li>"+
            "<li>10、成功邀请学员，获得5元奖励</li>"+
            "<li>11、成功邀请学员，获得5元奖励</li>"+
        "</ul>"+
        "</div>"+
        "<div class='tab-right'>"+
        "<img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/img-right.png' alt=''>"+
    "</div>";
    var dialog = new auiDialog();
    dialog.alert({
        title:"",
        msg:strMsg,
        buttons:['<button></button>',"<div class='filtDiv'><img src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/img-rule.svg'></div>"]
    },function(ret){
        console.log(ret.buttonIndex);
    })

    var tab = new auiTab({
        element:document.getElementById("tab"),
    },function(ret){
        console.log(ret);
    });
}

function memberFunc(num){
    switch(num){
        case 1:
            window.location.href="member-gold.html";
            break;
        case 11:
            window.location.href="member-gold-trail.html";
            break;
        case 2:
            window.location.href="member-diamond.html";
            break;
        case 3:
            window.location.href="total-summary.html";
            break;
        case 4:
            window.location.href="invite-num.html";
            break;
        case 5:
            window.location.href="invite-students.html";
            break;
        case 6:
            window.location.href="invite-member.html";
            break;
        case 7:
            window.location.href="lottery-draw.html";
            break;
        case 8:
            window.location.href="more-activity.html";
            break;
        case 91:
            window.location.href="http://wx-yxyx-web.leo1v1.com/wx_yxyx_leo-Introduction/index.html";
            break;
        case 92:
            window.location.href="http://wx-yxyx-web.leo1v1.com/wx_yxyx_BoutiqueContent/index.html?p_phone="+p_phone+"&wx_openid="+wx_openid;
            break;
        case 93:
            window.location.href="http://wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback/index.html?wx_openid="+wx_openid;
            break;
        case 94:
            window.location.href="http://www.leo1v1.com/market-l/index.html";
            break;
        default:
            break;
    }
}

