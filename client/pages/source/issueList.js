// pages/source/issueList.js
Page({

  /**
   * Page initial data
   */
  data: {
    TabCur: 0,
    menu: ['open', 'closed']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })


  }
})