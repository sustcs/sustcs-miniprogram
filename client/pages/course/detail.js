//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        pageConfig: {
            title: "review detail",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        }


    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    agree(e) {

    },
    onLoad: function () { },
    onShareAppMessage(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123'
        }
    }
});
