// pages/detail/index.js
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
            url: app.globalData.backendUrl + '/home/detail/detail',
            data: {
                type: type,
                title: title
            },
            success: function (res) {
                let resp = res.data;
                //处理数据仓库
                that.setData({
                    type: resp.data[0].type,
                    imgUrl: resp.data[0].imgUrl,
                    title: resp.data[0].title,
                    info: resp.data[0].info,
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