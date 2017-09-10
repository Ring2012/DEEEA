/*
 * 
 * 
 * 
 * */
$(document).ready(function () {
    $(".tab li").on("click",function () {
        var index=$(this).index();
        $(this).addClass("activeTab").siblings("li").removeClass("activeTab");
        $(".warp>div").eq(index).show().siblings("div").hide();
    });

//----------------------预约------
    make();
    function make() {//获取预约列表
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '#make', //流加载容器
                isAuto: true,
                scrollElem:"#make",
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: "post",
                        url: "/home/index/make",
                        dataType: 'json',
                        data: {page: page},
                        success: function (data) {
                            if (data.data.totalPages > 0) {
                                var Data = data.data.data;
                                var content = $("#make-tpl").tmpl(Data);
                                console.log(page);
                                next(content, page < data.data.totalPage); //假设总页数为 10
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
    $("#make").on("click",".makeBtn" ,function () {
        var order_number=$(this).attr("data-num");
        var beautician=$(this).parents(".contentList").find(".sec option:selected").val();
        var servicing_time=$(this).parents(".contentList").find(".time").val();
        if(beautician == 0){
            layer.msg($(this).parents(".contentList").find(".sec option:selected").text());
            return;
        }
        if(servicing_time == ""){
            layer.msg("请选择服务时间");
            return;
        }
        $.ajax({
            type: "post",
            url: "/home/index/makes",
            dataType: 'json',
            beforeSend: function () {
                layerLoading = layer.load(1, {
                    shade: [0.5, '#000']
                });
            },
            complete: function () {
                layer.close(layerLoading);
            },
            data: {order_number: order_number,beautician: beautician,servicing_time: servicing_time},
            success: function (data) {
                if(data.errno == 0){
                    layer.msg("操作成功");
                    $("#make").empty();
                    make();
                }else{
                    layer.msg("操作失败");
                }
            },
            error: function () {
                console.log("error");
            }
        });

    });


//----------------------订单------
    order();
    function order() {//获取订单列表
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '#order', //流加载容器
                isAuto: true,
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: "post",
                        url: "/home/index/order",
                        dataType: 'json',
                        data: {page: page},
                        success: function (data) {
                            if (data.data.totalPages > 0) {
                                var Data = data.data.data;
                                var content = $("#order-tpl").tmpl(Data);
                                console.log(page);
                                next(content, page < data.data.totalPage); //假设总页数为 10
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
    $("#order").on("click",".orderBtn" ,function () {
        var order_number=$(this).attr("data-num");
        layer.confirm('您确定该订单已支付？', {
          btn: ['确定','取消'] //按钮
        }, function(){
          $.ajax({
            type: "post",
            url: "/home/index/orders",
            dataType: 'json',
            beforeSend: function () {
                layerLoading = layer.load(1, {
                    shade: [0.5, '#000']
                });
            },
            complete: function () {
                layer.close(layerLoading);
            },
            data: {order_number: order_number},
            success: function (data) {
                if(data.errno == 0){
                    layer.msg("操作成功");
                    $("#order").empty();
                    order();
                }else{
                    layer.msg("操作失败");
                }
            },
            error: function () {
                console.log("error");
            }
        });

    });
        });
        
//----------------------历史------
    record()
    function record() {//获取订单列表
        layui.use('flow', function () {
            var flow = layui.flow;
            flow.load({
                elem: '#record', //流加载容器
                isAuto: true,
                scrollElem:"#record",
                mb:100,
                done: function (page, next) { //执行下一页的回调
                    $.ajax({
                        type: "post",
                        url: "/home/index/record",
                        dataType: 'json',
                        data: {page: page},
                        success: function (data) {
                            if (data.data.totalPages > 0) {
                                var Data = data.data.data;
                                var content = $("#record-tpl").tmpl(Data);
                                next(content, page < data.data.totalPage); //假设总页数为 10
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
});
