//app.js
App({
    onLaunch: function () {
        wx.login({
            //获取code
            success: function (res) {
                var code = res.code; //返回code
                var appId = 'wx8593f5ceefc58025';
                var secret = 'e25b096d18ed2cae05b5f9dbcb0c5d47';
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                        'content-type': 'json'
                    },
                    success: function (res) {
                        var openid = res.data.openid //返回openid
                        wx.setStorageSync('openid', openid);//储存openid
                    }
                })
            }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    console.log(res);
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null,
        backendUrl: "http://127.0.0.1:8306/"//http://deeea.viphk.ngrok.org/
    }
})
