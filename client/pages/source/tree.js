//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        pageConfig: {
            title: "tree",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },

    },

    onLoad: function () {
        // 

    },
    fileInfo: function (e) {
        var downloadUrl = e.detail + (e.detail.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment';
        //判断文件类型
        wx.downloadFile({
            url: downloadUrl,
            success(res) {
                const filePath = res.tempFilePath
                wx.openDocument({
                    filePath,
                    success(res) {
                        console.log('open document success')
                    }
                })
            }
        })
        console.log(e.detail)

    },
    onMyEvent(e) {
        e.detail // 自定义组件触发事件时提供的detail对象
    }
});
