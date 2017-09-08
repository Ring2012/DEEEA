/*
 * 
 * 
 * 
 * */
$(document).ready(function () {
    make();

    function make() {//获取预约列表
        /*$.ajax({
            type: "post",
            url: "/home/index/make",
            dataType: 'json',
            beforeSend: function () {
                layerLoading = layer.load(1, {
                    shade: [0.5, '#000']
                });
            },
            complete: function () {
                layer.close(layerLoading);
            },
            success: function(data){
                console.log(data.data);
                //$(".content").empty();
                console.log(data.data.totalPages);
                if (data.data.totalPages > 0) {
                    var Data = data.data.data;
                    //var Data = data.data.data;
                    $("#make-tpl").tmpl(Data).appendTo(".content");
                    
                }else{
                    //$("#log-list").html('<tr><td  class="cursor-p" colspan="6"><i class="fa fa-info-circle" aria-hidden="true"></i> 暂无数据！</td></tr>');
                }
            },
            error: function () {
                console.log("error");
            }
        });*/
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '.content', //流加载容器
                isAuto: true,
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: "post",
                        url: "/home/index/make",
                        dataType: 'json',
                        data: {page: page},
                        success: function (data) {
                            if (data.data.totalPages > 0) {
                                var Data = Jdata.data.data;
                                var content = $("#tab-content-tmpl").tmpl(Data);
                                next(content, page < data.data.totalPages); //假设总页数为 10
                            } else {
                                $(".layui-flow-more").html("暂无数据").find("a").hide();
                            }
                        },
                        error: function () {
                            console.log("error");
                        }
                    });
                }
            });
        });
    }


    $(".make").on("click", function () {

    });
});
