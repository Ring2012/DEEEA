// pages/typeList/index.js
Page({
    data: {
        typeUrls: [//轮播
            'banner-1.png'
        ],
        typeList: [//分类列表
            {
                id: 1,
                tcImg: 'tab-1.png',
                tcTit: '纯色美甲_copy',
                tcPrice: '68'
            },
            {
                id: 2,
                tcImg: 'tab-2.png',
                tcTit: '钻石女王款',
                tcPrice: '168'
            },
            {
                id: 3,
                tcImg: 'tab-3.png',
                tcTit: '精美小钻',
                tcPrice: '128'
            }
        ]
    },
    tabDetailTap: function (e) {//详情
        wx.navigateTo({
            url: '../detail/index'
        })
    }
})