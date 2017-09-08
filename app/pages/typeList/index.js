// pages/typeList/index.js
var app = getApp();
Page({
    data: {
        tabContent: [],//分类列表
        show: true,
        hidden: false,
        bottomLine: false,
    },
    onLoad: function () {
        this.getTabList();//分类列表
    },
    //网络请求数据
    getTabList: function () {
        var that = this
        var type = wx.getStorageSync('type');//储存当前分类
        //调用方法获取分类内容列表
        wx.request({
            url: app.globalData.backendUrl + '/home/list/page',
            data: {
                type: type
            },
            success: function (res) {
                let resp = res.data.data;
                let list = [];
                if (resp.data.length == 0) {
                    that.setData({
                        bottomLine: true
                    });
                } else {
                    that.setData({
                        bottomLine: false
                    });
                }
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        type: resp.data[i].type,
                        imgUrl: resp.data[i].imgUrl,
                        title: resp.data[i].title,
                        price: resp.data[i].price
                    });
                }
                //处理数据仓库
                that.setData({
                    tabContent: list,
                    hidden: true,
                    show: false
                })

            }
        })
    },
    tabDetailTap: function (e) {//详情
        let type = e.currentTarget.dataset.type;//获取当前分类
        let title = e.currentTarget.dataset.title;//获取当前标题
        wx.setStorageSync('type', type);//储存当前分类
        wx.setStorageSync('title', title);//储存当前标题
        wx.navigateTo({
            url: '../detail/index'
        })
    }
})