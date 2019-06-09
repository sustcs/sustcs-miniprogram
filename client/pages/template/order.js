const app = getApp();
Page({
  data: {
    TabbarBot: app.globalData.tabbar_bottom
  },
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: e => {
        //适配全面屏底部距离
        if (CustomBar > 75) {
          this.globalData.tabbar_bottom = "y"
        }
      }
    })
  }

});