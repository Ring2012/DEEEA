//index.js
var app = getApp();
Page({
    data: {
        bannerUrls: [],//banner url
        recommend: [],//推荐列表
        tab: [],//分类
        tabItem: 5,//默认类
        tabContent: [],//分类列表
        show: true,
        hidden: false,
        bottomLine: false,
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '娇雅会所',
            desc: '描述',
            path: 'pages/index/index',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                    icon: 'loading',
                    duration: 1000
                });
            },
            fail: function (res) {
                wx.showToast({
                    title: '转发失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        }
    },
    //网络请求数据
    getBannerList: function () {
        var that = this
        //调用方法获取banner url
        wx.request({
            url: app.globalData.backendUrl + '/home/login/banner',
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
            url: app.globalData.backendUrl + '/home/login/recommend',
            success: function (res) {
                let resp = res.data;
                let list = [];
                for (var i = 0; i < resp.data.length; i++) {
                    list.push({
                        type: resp.data[i].type,
                        imgUrl: resp.data[i].imgUrl,
                        info: resp.data[i].info,
                        title: resp.data[i].title,
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
            url: app.globalData.backendUrl + '/home/login/type',
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
            url: app.globalData.backendUrl + '/home/login/page',
            data: {
                type: that.data.tabItem
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
    //事件处理函数
    detailTap: function (e) {//分类
        var that = this
        let type = e.currentTarget.dataset.type;//获取当前分类
        wx.setStorageSync('type', type);//储存当前分类
        if (type != 0) {
            wx.navigateTo({
                url: '../typeList/index'
            })
        } else {//优惠
            // wx.navigateTo({
            //     url: '../discount/index'
            // })
        }
    },
    recommendTap: function (e) {//立即预约
        let type = e.currentTarget.dataset.type;//获取当前分类
        let title = e.currentTarget.dataset.title;//获取当前标题
        wx.setStorageSync('type', type);//储存当前分类
        wx.setStorageSync('title', title);//储存当前标题
        wx.navigateTo({
            url: '../message/index'
        })
    },
    tabTap: function (e) {//选项卡
        var typeId = e.currentTarget.dataset.type;//获取当前typeId
        this.setData({
            'tabItem': typeId
        });
        this.getTabList();
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