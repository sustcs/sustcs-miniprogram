// pages/competition/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    list: [{
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      url: '微信小程序应用开发赛'
    },
    {
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      url: '网络技术挑战赛'
    },
    {
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
      url: '团体程序设计天梯赛'
    },
    {
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
      url: '人工智能创意赛'
    }, {
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
      url: '大数据挑战赛'
    }, {
      title: '2019 -- 中国高校计算机大赛',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
      url: '移动应用创新赛'
    }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  toChild: function (e) {
    wx.navigateTo({
      url: 'detail?competition=' + e.currentTarget.dataset.url,
    })
  }
})