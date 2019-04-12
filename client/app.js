//app.js
App({
  onLaunch: function () {
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();

        this.globalData.Custom = custom;
        this.globalData.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    // wx.cloud.init({
    //   env: "test-728bbc"
    // });
  },
  globalData: {
    userInfo: null
  }
});
