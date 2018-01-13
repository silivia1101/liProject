var grade="",subject="",test_type="";
var page_num=1;
var currentPage_=1;
//  页面一打开调用的函数
$(function(){
        Ajax();
// function left() {
//     alert(123)
 })
//  ajax请求函数
function Ajax() {
    $.ajax({
        "url": 'http://admin.leo1v1.com/wx_yxyx_common/get_all_test_pic',
        "type": 'get',
        "dataType": 'jsonp',
        "data": {'page_num':page_num,
            'grade':grade,
            'subject':subject,
            'test_type':test_type,
            'wx_openid':geturl('wx_openid')
        },
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                alert(result['info']);
            } else {
                // 成功
                $("#barcon").createPage({
                    totalPage:result.home_info.page_info.total_num,
                    currPage:3,
//                  currPage:4,
                    turndown:'true',
                    backFn:function(p){
                        console.log("回调函数："+p);
                    }
                });
                dynamicAddUser(result);
                upLoadFunc(result);


            }
        }
    });
}
//  搜索框点击搜索事件
// $(".searchIng").click(function(){
//     grade=$("#grade")[0].value;
//     subject=$("#subject")[0].value;
//     test_type=$("#test_type")[0].value;
//     $.ajax({
//         "url": 'http://admin.leo1v1.com/wx_yxyx_common/get_all_test_pic',
//         "type": 'get',
//         "dataType": 'jsonp',
//         "data": {'page_num':1,
//             'grade':grade,
//             'subject':subject,
//             'test_type':test_type,
//             'wx_openid':geturl('wx_openid')
//         },
//         async:true,
//         success: function(result) {
//             if (result['ret'] != 0) {
//                 alert(result['info']);
//             } else {
//                 // 成功
//                 $("#adminTbody").html("");
//                 $("#barcon").createPage({
//                     totalPage:result.home_info.page_info.total_num,
//                     currPage:4,
//                     turndown:'true',
//                     backFn:function(p){
//                         console.log("回调函数："+p);
//                     }
//                 });
//                 dynamicAddUser(result);
//             }
//         }
//     });
// });

//  根据请求结果动态创建table表格的tbody
function dynamicAddUser(result){
    $("#adminTbody").html("");
    for(var i=0;i<result.home_info.list.length;i++){
        var tTime=parseDate(result.home_info.list[i].create_time);
        // result.home_info.list[0].flag=0;
        if(result.home_info.list[i].flag==0){
            strDiv=$("<tr align='center' onclick='detailFunc("+result.home_info.list[i].id+","+result.home_info.list[i].flag+",0)'>\n" +
                "        <td class='td2' ><p style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;'>"+result.home_info.list[i].test_title+"</p></td>\n" +
                "        <td class='' style='position: relative;'>"+tTime+"<span class='titlesTip' style='position: absolute;'>new</span></td>\n" +
                "    </tr>");
        }else{
            strDiv=$("<tr align='center' onclick='detailFunc("+result.home_info.list[i].id+","+result.home_info.list[i].flag+",0)'>\n" +
                "        <td class='td2' ><p style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;'>"+result.home_info.list[i].test_title+"</p></td>\n" +
                "        <td class='' >"+tTime+"</td>\n" +
                "    </tr>");
        }
        $("#adminTbody").append(strDiv);
    }
}
//  轮播图
function upLoadFunc(result){
    var strImg="<div id='slide' class='slide' alt='star' style=''>";
    var jsonArr=result.home_info.poster;
    for(var i=0;i<jsonArr.length;i++){
        if((i+2)<=jsonArr.length){
            strImg+="<div class='img img"+(i+2)+" img"+(i+1)+"' data-slide-imgid='"+i+"'><img  onclick='javascript:detailFuncs("+jsonArr[i].id+",1)' src='"+jsonArr[i].poster+"'></div>";

            // strImg+="<div class='img img"+(i+2)+" img"+(i+1)+"' data-slide-imgid='"+i+"'><p  onclick='javascript:detailFuncs("+jsonArr[i].id+",1)' style='background-image: url("+jsonArr[i].poster+");background-size: cover;'></p></div>";
            // strImg+="<div class='img img"+(i+2)+" img"+(i+1)+"' data-slide-imgid='"+i+"'><p onclick='detailFunc("+jsonArr[i].id+",1)' style='background-image: url("+jsonArr[i].poster+");background-size: cover;'></p></div>";
        }else if(jsonArr.length-(i+2)>=0){
            strImg+="<div class='img img"+(jsonArr.length-(i+2))+" img"+(i+1)+"' data-slide-imgid='"+i+"'><p onclick='javascript:detailFuncs("+jsonArr[i].id+",1)' style='background-image: url("+jsonArr[i].poster+");background-size: cover;'></p></div>";
            // strImg+="<div class='img img"+(jsonArr.length-(i+2))+" img"+(i+1)+"' data-slide-imgid='"+i+"'><p onclick='detailFunc("+jsonArr[i].id+",1)' style='background-image: url("+jsonArr[i].poster+");background-size: cover;'></p></div>";
        }
    }
    strImg+="</div>";
    $("#carousel").html(strImg);
}
//  跳转链接
function detailFunc(id,flag,index){
    if(index==0){
//         window.location.href= 'detail.html?id='+id+'&flag='+flag+'&wx_openid='+geturl('wx_openid')+'&p_phone='+geturl("p_phone");
        window.location.href= '//wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback/detail.html?id='+id+'&flag='+flag+'&wx_openid='+geturl('wx_openid')+'&p_phone='+geturl("p_phone");
    }
}
function detailFuncs(id,index){
    if(index==1){
//         window.location.href= 'detail.html?id='+id+'&wx_openid='+geturl('wx_openid')+'&p_phone='+geturl("p_phone");
        window.location.href= '//wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback/detail.html?id='+id+'&wx_openid='+geturl('wx_openid')+'&p_phone='+geturl("p_phone");
    }
}

