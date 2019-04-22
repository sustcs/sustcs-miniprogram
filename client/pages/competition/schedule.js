// pages/competition/schedule.js
Page({

  /**
   * Page initial data
   */
  data: {
    gradual: ['#FA9C05', '#F36302'],
    title: '微信小程序应用开发赛',
    schedule: [{
      time: '8月',
      now: false,
      type: '总决赛',
      state: '训练营',
      note: '参赛队伍需要提交正式线上版本或者体验版参赛作品参加评审，因无法提供相应特殊资质而未能上线发布的参赛作品，必须提交小程序/小游戏体验版，否则将无法进行评审。'
    }, {
      time: '7月25日',
      now: true,
      type: '总决赛',
      state: '入围总决赛名单',
      note: '参赛队伍需要提交正式线上版本或者体验版参赛作品参加评审，因无法提供相应特殊资质而未能上线发布的参赛作品，必须提交小程序/小游戏体验版，否则将无法进行评审。'
    }, {
      time: '6月16日',
      now: false,
      type: '分区赛',
      state: '入围赛区决赛名单',
      note: '参赛队伍需要提交正式线上版本或者体验版参赛作品参加评审，因无法提供相应特殊资质而未能上线发布的参赛作品，必须提交小程序/小游戏体验版，否则将无法进行评审。'
    }, {
      time: '5月31日',
      now: false,
      type: '初赛',
      state: '提交作品',
      note: '参赛队伍需要提交正式线上版本或者体验版参赛作品参加评审，因无法提供相应特殊资质而未能上线发布的参赛作品，必须提交小程序/小游戏体验版，否则将无法进行评审。'
    },]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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