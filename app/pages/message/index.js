// pages/message/index.js
var app = getApp();
Page({
    data: {
        hidden: false
    },
    onLoad: function (e) {
        this.getDetailList();
    },
    getDetailList: function () {
        var that = this
        var type = wx.getStorageSync('type');//储存当前分类
        var title = wx.getStorageSync('title');//储存当前分类
        //调用方法获取分类内容列表
        wx.request({
            url: app.globalData.backendUrl + '/home/message/message',
            data: {
                type: type,
                title: title
            },
            success: function (res) {
                let resp = res.data;
                var list = [];
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        type: resp.data[i].type,
                        imgUrl: resp.data[i].imgUrl,
                        title: resp.data[i].title,
                        info: resp.data[i].info,
                        price: resp.data[i].price,
                        time: resp.data[i].time
                    });
                }
                //处理数据仓库
                that.setData({
                    type: resp.data[0].type,
                    imgUrl: resp.data[0].imgUrl,
                    title: resp.data[0].title,
                    remark: resp.data[0].remark,
                    price: resp.data[0].price,
                    time: resp.data[0].time,
                    hidden: true
                })

            }
        })
    },
    orderTap: function (e) {
        var type = e.currentTarget.dataset.type;//获取当前分类
        var title = e.currentTarget.dataset.title;//获取当前标题
        wx.setStorageSync('type', type);//储存当前分类
        wx.setStorageSync('title', title);//储存当前标题
        wx.navigateTo({
            url: '../message/index'
        })
    }
})