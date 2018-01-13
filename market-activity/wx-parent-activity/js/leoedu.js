/**
 * Created by LE on 2017/11/22.
 */

function geturl(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
};
var test=0;

var weixinTitles = "¥100元感恩话费，学习礼包等你免费领取，点击瓜分奖品";
var weixinLinks = "http://wx-parent.leo1v1.com/wx_parent_gift/marketing_department_activity?type="+type+"&web_page_id="+web_page_id+"&from_adminid="+from_adminid;
// var weixinLink = "http://wx-parent-web.leo1v1.com/wx-activity/index.html";
var weixinImageUrls = "http://wx-parent-web.leo1v1.com/wx-activity/img/wxshare.png";
var weixinDescs = "点击领取话费";