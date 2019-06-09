// pages/source/issueList.js
const { basic_url, repo_full_name } = require('../../config');
const { timeago } = require('../../utils/common');
Page({

  /**
   * Page initial data
   */
  data: {
    TabCur: 0,
    state: ['open', 'closed']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (option) {
    this.getIssue()
  },
  getIssue(state = 'open') {
    let that = this
    var url = basic_url + repo_full_name + '/issues'
    wx.showLoading({
      title: 'loading'
    })
    if (state === 'closed') {
      url = basic_url + repo_full_name + '/issues?state=closed'
    }
    var option = {
      url: url,
      headers: {
        'Authorization': wx.getStorageSync('Authorization'),
        'User-Agent': 'request'
      },
    }

    wx.cloud.callFunction({
      name: 'github',
      data: option,
      complete: res => {

        if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
          var issueList = res.result;
          issueList.forEach(function (item, index, arr) {
            item.created_at = timeago(Date.parse(new Date(item.created_at)))
          })

          that.setData({
            issueList: issueList,
          }, () => {
            wx.hideLoading()
          })

        } else if (res.errMsg !== 'cloud.callFunction:ok') {
          wx.hideLoading();
          wx.showModal({
            title: res.errMsg,
            content: 'Please check the network connection',
            showCancel: false,
          })
        } else if (res.result === null) {
          console.log('cloudfunction error')
        }
        //error function
      },
    })

  },
  tabSelect(e) {
    this.getIssue(this.data.state[e.currentTarget.dataset.id])

    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })

  }
})