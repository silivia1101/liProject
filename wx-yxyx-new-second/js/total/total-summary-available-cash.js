/**
 * Created by LE on 2017/10/27.
 */
var page_count=1,per_page_count=5,tabIndex="",table_type=1,dataTab=0;

$(function(){
createTotalHtmls();
    AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,{'page_num':page_count,'per_page_count':per_page_count,'table_type':table_type},table_type,dataTab)
// page_count++;
})
// 循环创建tab切换列表
function createTotalHtmls(){
    var strHtml="<div class='aui-tab' id='tab'>"+
                "<div class='aui-tab-item aui-active'>我的邀请</div>"+
                "<div class='aui-tab-item'>会员邀请</div>"+
            "</div>"+
            "<div class='tab-div-container'>"+
                "<div class='tab-div-first'>"+
                    "<ul class='mine-invite'></ul>"+
                    // "<div class='btnMore'><button onclick='ajaxTab1()'>点击加载更多</button></div>"+
                "</div>"+
                "<div class='tab-div-second'>"+
                    "<ul class='member-invite'></ul>"+
                    // "<div class='btnMore'><button onclick='ajaxTab1()'>点击加载更多</button></div>"+
                "</div>"+
            "</div>";
    $(".container-total-box").html(strHtml);
createAui();

    // $("div.aui-tab-item").click(function(){
    //     $(".tab-div-container ul").html("");
    //     $(".tab-div-container .btnMore").html("");
    //     tabIndex=$(this).html();
    //     page_count=1;
    //     AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,page_count,per_page_count,tabIndex);
    //     // page_count++;
    // })
    $("div.aui-tab-item").eq(0).click(function(){
        page_count=1;
        table_type=1;
        dataTab=0;
        AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,{'page_num':page_count,'per_page_count':per_page_count,'table_type':table_type},table_type,dataTab);
    })
    $("div.aui-tab-item").eq(1).click(function(){
        page_count=1;
        table_type=2;
        dataTab=0;
        AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,{'page_num':page_count,'per_page_count':per_page_count,'table_type':table_type},table_type,dataTab);
    })
}
// 点击加载更多
// function ajaxTab1(){
//     page_count++;
//     $(".tab-div-container .btnMore").html("");
//     AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,page_count,per_page_count);
//     // page_count++;
// }

function ajaxTab1(indexTab){
    page_count++;
    table_type=indexTab;
    if(indexTab==1){
        dataTab=1;
        AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,{'page_num':page_count,'per_page_count':per_page_count,'table_type':table_type},table_type,dataTab);
    }else if(indexTab==2){
        dataTab=2;
        AjaxToalFuncs(baseUrl+"wx_yxyx_api/get_can_cash_commission"+userId,{'page_num':page_count,'per_page_count':per_page_count,'table_type':table_type},table_type,dataTab);
    }
}
var disredsult="";
// 循环创建tab切换内容列表
function createTotalHtml(result,url,table_type,dataTab){
    console.log(disredsult);
    console.log(url);
    if(disredsult==url){
        return;
    }
    disredsult = url;

    $(".tab-div-container .btnMore").html("");
    // $(".btnMore").remove();
    if(dataTab==1 && table_type==1){
        createFunc1(result,url);
        return;
    }
    if(dataTab==2 && table_type==2){
        createFunc2(result,url);
        return;
    }
    if(table_type==1 && dataTab==0){
        $(".mine-invite").html("");
        // $(".tab-div-container ul").eq(0).html("");
        createFunc1(result,url);
        return;}
    if(table_type==2 && dataTab==0){
        // $(".tab-div-container ul").eq(1).html("");
        $(".member-invite").html("");
        createFunc2(result,url);
        return;
    }
}
// 我的邀请
function createFunc1(result,url){
    // 我的邀请
    var mineInvite="",mine_status=[],minBtn="";
    if(result.child_reward.list.length>0){
        for(var i=0;i<result.child_reward.list.length;i++){
            mineInvite+="<li class='tab-content-lis' >"+
                "<div class='tab-content-lis-box'>"+
                "<div class='total-cash-containers'>"+
                "<p>姓名：<span>"+result.child_reward.list[i].nickname+"</span></p>"+
                "<p>时间：<span>"+result.child_reward.list[i].create_time+"</span></p>"+
                "<p>购买课程：<span>"+result.child_reward.list[i].price+"元</span></p>"+
                "<p>状态：<span>学生已上"+result.child_reward.list[i].count+"节课</span></p>"+
                "</div>"+
                "<div class='right-avai-div'>"+
                "<img class='total-bottom' src='img/avai/img2-1.svg'>"+
                "<p class=''>"+result.child_reward.list[i].p_open_price+"元</p>"+
                "</div>"+
                "</div>"+
                "</li>";
        }
        $(".mine-invite").append(mineInvite);
        if(result.child_reward.page_info.page_num < result.child_reward.page_info.total_num/5) {
            if (result.child_reward.list.length == 5) {
                minBtn = "<div class='btnMore'><button onclick='ajaxTab1(1)'>下一页</button></div>";
                $(".tab-div-first").append(minBtn);
                minBtn = "";
            }
        }
    }
    else{
        minBtn="<div class='div-sub-img'><img class='subImg' src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/img-que.svg'></div>";
        $(".mine-invite").append(minBtn);
        minBtn="";
        // $(".tab-div-first .btnMore button").html("无数据");
    }
    $.getScript("js/total/total-summary-total.js");
}
// 會員邀請
function createFunc2(result,url){
    // 会员邀请
    var memberInvite="",memBtn="";
    if(result.member_reward.list.length>0){
        for(var j=0;j<result.member_reward.list.length;j++){
            memberInvite+="<li class='tab-content-lis' >"+
                "<div class='tab-content-lis-box'>"+
                "<div class='total-cash-containers'>"+
                "<p>姓名：<span>"+result.member_reward.list[j].nickname+"</span></p>"+
                "<p>时间：<span>"+result.member_reward.list[j].create_time+"</span></p>"+
                "<p>购买课程：<span>"+result.member_reward.list[j].price+"元</span></p>"+
                "<p>状态：<span>学生已上"+result.member_reward.list[j].count+"节课</span></p>"+
                "</div>"+
                "<div class='right-avai-div'>"+
                "<img class='total-bottom' src='img/avai/img2-1.svg'>"+
                "<p class=''>"+result.member_reward.list[j].p_open_price+"元</p>"+
                "</div>"+
                "</div>"+
                "</li>";
        }
        $(".member-invite").append(memberInvite);
        if(result.member_reward.page_info.page_num < result.member_reward.page_info.total_num/5) {
            if (result.member_reward.list.length == 5) {
                memBtn = "<div class='btnMore'><button onclick='ajaxTab1(2)'>下一页</button></div>";
                $(".tab-div-second").append(memBtn);
                memBtn = "";
            }
        }
    }
    else{
        memBtn="<div class='div-sub-img'><img class='subImg' src='http://wx-yxyx-web.leo1v1.com/wx-yxyx-new-second/img/total/img-que.svg'></div>";
        $(".member-invite").append(memBtn);
        memBtn="";
        // $(".tab-div-second .btnMore button").html("无数据");
    }
    $.getScript("js/total/total-summary-total.js");
}
