// pages/order/order.js
var app = getApp();
Page({
    data: {
        mine: [],
        show: false,
        bottomLine: true
    },
    onLoad: function (e) {
        this.getOrderList();
    },
    getOrderList: function () {
        var that = this
        var openid = wx.getStorageSync('openid');//用户id
        //调用方法获取分类内容列表
        wx.request({
            url: app.globalData.backendUrl + '/home/order/order',
            data: {
                openid: openid
            },
            success: function (res) {
                let resp = res.data.data;
                let list = [];
                if (resp.data.length == 0) {
                    that.setData({
                        show: true,
                        bottomLine: false
                    });
                }
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        title_img: resp.data[i].title_img,
                        order_number: resp.data[i].order_number,
                        remark: resp.data[i].remark,
                        projectName: resp.data[i].projectName,
                        time: resp.data[i].time,
                        beautician: resp.data[i].beautician,
                        order_status: resp.data[i].order_status,
                        price: resp.data[i].price,
                        pay_status: resp.data[i].pay_status,
                        servicing_time: (resp.data[i].servicing_time).replace("T", " ").replace(".000Z", " ")
                    });
                }
                //处理数据仓库
                that.setData({
                    mine: list
                })

            }
        })
    }
})