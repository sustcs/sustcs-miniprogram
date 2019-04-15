//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        pageConfig: {
            title: "content",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        }
    },

    onLoad: function () {
        // 

    }
});
