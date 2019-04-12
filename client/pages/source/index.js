//index.js
//获取应用实例
const app = getApp();
const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
    data: {
        pageConfig: {
            title: "file system",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },
        toView: 'red',
        scrollTop: 100

    },

    onLoad: function () {

    },
    upload() {
        // wx.cloud.init()
        // wx.chooseImage({
        //     success: chooseResult => {
        //         // 将图片上传至云存储空间
        //         wx.cloud.uploadFile({
        //             // 指定上传到的云路径
        //             cloudPath: 'my-photo.png',
        //             // 指定要上传的文件的小程序临时文件路径
        //             filePath: chooseResult.tempFilePaths[0],
        //             // 成功回调
        //             success: res => {
        //                 console.log('上传成功', res)
        //             },
        //         })
        //     },
        // })

    },
});
