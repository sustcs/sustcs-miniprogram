//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  onLoad: function() {},
  showQrcode() {
    wx.previewImage({
      urls: ["https://sustcs-cdn.makergyt.com/reward.jpg"],
      current: "https://sustcs-cdn.makergyt.com/reward.jpg" // 当前显示图片的http链接
    });
  }
});
