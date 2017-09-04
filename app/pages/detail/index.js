// pages/detail/index.js
// pages/typeList/index.js
Page({
    data: {
        id: [1],
        detailUrls: ['rmb-1.png'],
        title: ['钻石女王款'],
        info: ['明星们都爱用的美白产品，自然堂明星推荐，多种美白成分助力肌肤嫩白~'],
        price: ['168'],
        time: ['60'],
        timer: ['10：00 - 21:00'],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
    },
    orderTap: function () {
        wx.navigateTo({
            url: '../message/index'
        })
    }
})