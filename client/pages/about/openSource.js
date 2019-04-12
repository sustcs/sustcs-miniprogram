//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  onLoad: function() {},
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: "Content copied",
          duration: 1000
        });
      }
    });
  }
});
