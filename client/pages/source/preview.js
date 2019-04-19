//index.js
//获取应用实例
const { base64_decode } = require('../../utils/base64');
Page({
    data: {
    },

    onLoad: function (option) {
        wx.showLoading({
            title: 'loading'
        })
        let that = this
        console.log(option.url)
        wx.cloud.callFunction({
            name: 'github',
            data: {
                url: option.url,
                headers: {
                    'Authorization': wx.getStorageSync('Authorization'),
                    'User-Agent': 'request'
                },
            },
            complete: res => {
                console.log(res)
                if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
                    that.setData({
                        md: res.result,//?
                        fileName: option.name
                    })
                    wx.hideLoading();

                } else if (res.errMsg !== 'cloud.callFunction:ok') {
                    wx.hideLoading();
                    wx.showModal({
                        title: res.errMsg,
                        content: 'Please check the network connection',
                        showCancel: false,
                    })
                } else if (res.result === null) {
                    console.log('cloudfunction error')
                }
                //error function
            },
        })

    },
});
