var current;
(function($){
	var ms = {
		init:function(totalsubpageTmep,args){
			return (function(){
				ms.fillHtml(totalsubpageTmep,args);
				ms.bindEvent(totalsubpageTmep,args);
			})();
		},
		//���html
		fillHtml:function(totalsubpageTmep,args){
			return (function(){
				totalsubpageTmep="";
				/************************START*********************/
				// ҳ����ڵ���4��ʱ����ӵ�һ��ҳ��Ԫ��
				if(args.currPage!=1 && args.currPage>=4 && args.totalPage!=4) {
					totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+1+"</a></li>";
				}
				/* ��ǰҳ��>4, ����<=��ҳ�룬��ҳ��>5����ӡ���������*/
				if(args.currPage-1>2 && args.currPage<=args.totalPage && args.totalPage>4) {
					totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_' data-go='' >...</a></li>";
				}
				/* ��ǰҳ���ǰ��ҳ */
				var start = args.currPage-2;
				/* ��ǰҳ��ĺ���ҳ */
				var end = args.currPage+2;
				/* ��ǰҳ���ǰ��ҳ */
//				var start = args.currPage-1;
				/* ��ǰҳ��ĺ���ҳ */
//				var end = args.currPage+1;
				
				if((start>1 && args.currPage<4) || args.currPage==1) {
					end++;
				}
				if(args.currPage>args.totalPage-4 && args.currPage>=args.totalPage) {
					start--;
				}
				
				for(; start<=end; start++) {
					if(start<=args.totalPage && start>=1) {
						if(start != args.currPage) {
							totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+start+"</a></li>";
						}else{
							totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+start+"</a></li>";
						}
					}
				}
				
				if(args.currPage+2<args.totalPage-1 && args.currPage>=1 && args.totalPage>5) {
					totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_' data-go='' >...</a></li>";
				}
				
				if(args.currPage!=args.totalPage && args.currPage<args.totalPage-2 && args.totalPage!=4) {
					totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+args.totalPage+"</a></li>";
				}

				if(args.currPage!=0){
					totalsubpageTmep += "<li class='ali'>跳转到第 <input id='jumpWhere' type='text' /> 页</li>";
	                // $("#barcon").append(strList);
	                totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go=''  id='jumpPage'>Go</a></li>";
				}
                console.log(totalsubpageTmep);
				$(".barcon").html(totalsubpageTmep);
			})();
		},
		//���¼�
		bindEvent:function(totalsubpageTmep,args){
			return (function(){
				totalsubpageTmep.on("click","a.geraltTb_pager",function(event){
					console.log($(this).text());
					var strJson=$(this).text();
					if(strJson=="Go"){
						current = parseInt($("#jumpWhere")[0].value);
					}else{
						current = parseInt(strJson);
					}
					// $("#adminTbody").html("");
                    $.ajax({
                        "url": 'http://admin.leo1v1.com/wx_yxyx_common/get_all_test_pic',
                        "type": 'get',
                        "dataType": 'jsonp',
                        "data": {'page_num':current,
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
                                ms.fillHtml(totalsubpageTmep,{"currPage":current,"totalPage":result.home_info.page_info.total_num,"turndown":args.turndown});
								dynamicAddUser(result);
                            }
                        }
                    });
					// ms.fillHtml(totalsubpageTmep,{"currPage":current,"totalPage":args.totalPage,"turndown":args.turndown});
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		ms.init(this,options);
	}
})(jQuery);

