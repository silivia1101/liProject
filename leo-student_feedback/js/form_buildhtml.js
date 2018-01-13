
function articleAjax(){
    $.ajax({
        "url": 'http://admin.leo1v1.com/wx_yxyx_common/get_one_test_and_other',
        "type": "get",
        "dataType": "jsonp",
        "data": {'id':geturl("id"),'flag':geturl("flag"),'wx_openid':geturl('wx_openid')},
        async:true,
        success: function(result) {
            if (result['ret'] != 0) {
                alert(result['info']);
            } else {
                // 成功
                console.log(result);
                //请求请求返回结果调用的函数
                creatHtml(result);
                wxShare(geturl("id"),result.list.poster,result.list.test_title,result.list.test_des);
            }
        }
    });
}
//根据请求成功返回的结果动态创建html
function creatHtml(result){
    //头部我的故事模块
    var strContent="<header>" +
        // "        <img src='img/pic_text.png' alt=''>" +
        "        <span class='titleDiv'>" +result.list.test_title+"</span>" +
        "    </header>" +
        "    <section class='container_box'>" +
        "<div class='containers_title'>开启他/她的故事:</div>"+
        "        <div class='headerDiv'>"+result.list.test_des+"</div>" +
        "<div class='TableDiv'></div>"+
        "        <div class='picDiv'></div>" +
        "        <div class='dateDiv'>" +
        "            <p>日期：<span class='dateYear'>"+parseDate(result.list.create_time)+"</span></p>" +
        "            <p>阅读量：<span class='readNum'>"+result.list.visit_num+"</span></p>" +
        "        </div>" +
        "    </section>";
    // console.log(strContent);
    $("#container").prepend(strContent);
    var testStr;
    if(result.list.grade_str!="未设置" && result.list.grade_str!="未设置" && result.list.test_type_str!="未设置"){
        testStr="            <p>"+result.list.grade_str+"</p>" +
            "            <p>"+result.list.subject_str+"</p>" +
            "            <p>"+result.list.test_type_str+"</p>" ;

    }else if(result.list.grade_str!="未设置" && result.list.grade_str=="未设置" && result.list.test_type_str=="未设置"){
        testStr="            <p>"+result.list.grade_str+"</p>" ;
    }else if(result.list.grade_str!="未设置" && result.list.grade_str!="未设置" && result.list.test_type_str=="未设置"){
        testStr="            <p>"+result.list.grade_str+"</p>" +
            "            <p>"+result.list.subject_str+"</p>";
    }else if(result.list.grade_str!="未设置" && result.list.grade_str=="未设置" && result.list.test_type_str!="未设置"){
        testStr="            <p>"+result.list.grade_str+"</p>" +
            "            <p>"+result.list.test_type_str+"</p>" ;
    }else if(result.list.grade_str=="未设置" && result.list.grade_str!="未设置" && result.list.test_type_str=="未设置"){
        testStr="            <p>"+result.list.subject_str+"</p>" ;
    }else if(result.list.grade_str=="未设置" && result.list.grade_str!="未设置" && result.list.test_type_str!="未设置"){
        testStr="            <p>"+result.list.grade_str+"</p>" +
            "            <p>"+result.list.test_type_str+"</p>" ;
    }else if(result.list.grade_str=="未设置" && result.list.grade_str=="未设置" && result.list.test_type_str!="未设置"){
        testStr="            <p>"+result.list.test_type_str+"</p>" ;
    }
    $(".TableDiv").html(testStr);

    // 头部我的故事图片动态创建
    for(var i=0;i<result.list.pic_arr.length;i++){
        if(result.list.pic_arr[i]){
            var strPic="<img src='"+result.list.pic_arr[i]+"' alt=''>";
            $(".picDiv").append(strPic);
            // console.log(strPic);
        }
    }
    //其他故事模块
    var strFooter="<footer class='footerS'>" +
        "            <div class='otherStorys'>" +
        // "                <img src='img/pic_text.png' alt=''>" +
        "                <span class='otherDiv'>其他故事</span>" +
        "            </div>" +
        "            <div class='dlDiv'></div>" +
        "        </footer>";
    $("#container").append(strFooter);
    // console.log(strFooter);
    //其他故事图片动态创建
    for(var j=0;j<result.list.other.length;j++){
        var strOther="<dl class='col-xs-6' onclick='detailFunc("+result.list.other[j].id+")'>" +
            "                    <dt class='otherStory' style='height:6rem;background-image:url("+result.list.other[j].poster+");background-repeat:no-repeat;background-size:cover;background-position:center center;'>" +
            // "                        <img src='"+result.list.other[j].poster+"' alt=''>" +
            "                    </dt>" +
            "                    <dd>"+result.list.other[j].test_title+"</dd>" +
            "                </dl>";

        $(".dlDiv").append(strOther);
        // console.log(strOther);
    }
}
function detailFunc(id){
    // window.location.href= 'detail.html?id='+id;
    window.location.href= '//wx-yxyx-web.leo1v1.com/wx_yxyx_student_feedback/detail.html?id='+id+'&wx_openid='+geturl('wx_openid');
}
