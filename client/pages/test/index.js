const app = getApp();
const { basic_url, repo_full_name, canFileType } = require('../../config');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    scroll: 0,
    dataDetail: {
      title: '计算机科学与技术'
    },
    elements: [
      { title: '资料', name: 'Source', color: 'purple', icon: 'vipcard', url: 'review' },
      { title: '评论 ', name: 'Comment', color: 'mauve', icon: 'formfill', rul: '../source/tree' },
    ],
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: e => {
        //适配全面屏底部距离
        if (app.globalData.CustomBar > 75) {
          this.globalData.tabbar_bottom = "y"
        }
      }
    })
  },
});