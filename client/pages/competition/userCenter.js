// pages/competition/userCenter.js
const app = getApp();
const wxCharts = require('../../utils/wxcharts')
var radarChart = null;
Page({

  /**
   * Page initial data
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    username: '',
    grade: '2015',
    avatar: 'https://img.xiaopiu.com/userImages/img9156799f8280.png',
    experience: [{
      name: '微信小程序应用开发赛',
      time: '2018-5-25',
      role: 'captain'
    },
    {
      name: '网络技术挑战赛',
      time: '2018-3-25',
      role: 'member'
    }],
    state: {
      action: 'start',
      team: 'San Antonio Spurs',
      competition: {
        title: '微信小程序应用开发赛',
        description: '2019 -- 中国高校计算机大赛',
        poster: 'https://res.wx.qq.com/community/dist/images/home_img_miniprogarmdevelopmentguides_2x_22399a.png',
        url: 'detail'
      },
      time: '2018-5-25'
    }
  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      username: options.username
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['1', '2', '3', '4', '5', '6'],
      series: [{
        name: '',
        data: [90, 110, 125, 95, 87, 122]
      }],
      width: windowWidth,
      height: 200,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})