//index.js
var app = getApp();
Page({
    data: {
        bannerUrls: [],//banner url
        recommend: [],//推荐列表
        tab: [],//分类
        tabItem: [5],//添加类
        tabContent: [],//分类列表
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
    },
    onLoad: function () {
        this.getBannerList();//banner
        this.getRecommendList();//推荐列表
        this.getTypeList();//分类
        this.getTabList();//分类列表
    },
    //网络请求数据
    getBannerList: function () {
        var that = this
        //调用方法获取banner url
        wx.request({
            url: app.globalData.backendUrl + '/home/index/banner',
            success: function (res) {
                let resp = res.data;
                let url = [];
                for (var i = 0; i < resp.data.length; i++) {
                    url.push(resp.data[i].bannerUrl);
                }
                //处理数据仓库
                that.setData({
                    bannerUrls: url
                })

            }
        })
    },
    getRecommendList: function () {
        var that = this
        //调用方法获取推荐列表
        wx.request({
            url: app.globalData.backendUrl + '/home/index/recommend',
            success: function (res) {
                let resp = res.data;
                let list = [];
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        type: resp.data[i].type,
                        imgUrl: resp.data[i].imgUrl,
                        info: resp.data[i].info,
                        price: resp.data[i].price
                    });
                }
                //处理数据仓库
                that.setData({
                    recommend: list
                })

            }
        })
    },
    getTypeList: function () {
        var that = this
        //调用方法获取分类列表
        wx.request({
            url: app.globalData.backendUrl + '/home/index/type',
            success: function (res) {
                let resp = res.data;
                let list = [];
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        type: resp.data[i].type,
                        tabTit: resp.data[i].remark
                    });
                }
                //处理数据仓库
                that.setData({
                    tab: list
                })

            }
        })
    },
    getTabList: function () {
        var that = this
        //调用方法获取分类内容列表
        wx.request({
            url: app.globalData.backendUrl + '/home/index/page',
            success: function (res) {
                console.log(res.data.data);
                let resp = res.data.data;
                let list = [];
                console.log(resp.data.length);
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
                    tabContent: list
                })

            }
        })
    },
    //事件处理函数
    detailTap: function (e) {//分类
        var that = this
        var Id = e.currentTarget.id;//获取当前id
        wx.setStorageSync('tabId', Id);//储存当前id
        if (Id != 0) {
            wx.navigateTo({
                url: '../typeList/index'
            })
        } else {//优惠
            wx.navigateTo({
                url: '../discount/index'
            })
        }
    },
    recommendTap: function () {
        wx.navigateTo({
            url: '../message/index'
        })
    },
    tabTap: function (e) {//选项卡
        var that = this;
        var typeId = e.currentTarget.dataset.type;//获取当前typeId
        that.setData({
            'tabItem': typeId
        })
    },
    tabDetailTap: function (e) {//详情
        wx.navigateTo({
            url: '../detail/index'
        })
    }
})