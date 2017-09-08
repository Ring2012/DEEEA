// pages/message/index.js
var util = require('../../utils/util.js')
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
    formSubmit: function (e) {
        var formList = e.detail.value;
        var openid = wx.getStorageSync('openid');
        var name = formList.name;
        var phone = formList.phone;
        var pay_way = formList.pay_way;
        var title = formList.title;
        var imgUrl = formList.imgUrl;
        var type = formList.type;
        var remark = formList.remark;
        var price = formList.price;
        var time = formList.time;
        var filterusername = /^([\u4e00-\u9fa5]){2,7}$/;
        if (!filterusername.test(name)) {
            wx.showToast({
                title: '正确填写姓名',
                icon: 'loading',
                duration: 1000
            });
            return false;
        }
        var filterphone = /^1[34578]\d{9}$/;
        if (phone.length == 0 || phone.length < 11 || !filterphone.test(phone)) {
            wx.showToast({
                title: '正确输入手机号',
                icon: 'loading',
                duration: 1000
            });
            return false;
        }
        wx.request({
            url: app.globalData.backendUrl + '/home/user/form',
            data: {
                openid: openid,
                name: name,
                phone: phone,
                pay_way: pay_way,
                title: title,
                imgUrl: imgUrl,
                type: type,
                remark: remark,
                price: price,
                time: time,
                timer: util.formatTime(new Date)
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '预约成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    });
                    wx.navigateTo({
                        url: '../index/index'
                    })
                } else {
                    wx.showToast({
                        title: '预约失败',
                        icon: 'loading',
                        duration: 1000
                    })
                }
            }
        })

    }
})