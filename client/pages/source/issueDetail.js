// pages/source/issueDetail.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (option) {
    wx.showLoading({
      title: 'loading'
    })
    let that = this
    wx.cloud.callFunction({
      name: 'github',
      data: {
        url: option.url,
        headers: {
          'Authorization': wx.getStorageSync('Authorization'),
          'User-Agent': 'request'
        },
      },
      complete: res => {
        if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
          that.setData({
            issue: res.result,//?
          })
          that.getComments(option.url + '/comments')
          wx.hideLoading();

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
  getComments(url) {
    let that = this
    wx.cloud.callFunction({
      name: 'github',
      data: {
        url: url,
        headers: {
          'Authorization': wx.getStorageSync('Authorization'),
          'User-Agent': 'request'
        },
      },
      complete: res => {
        console.log(res)
        if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
          that.setData({
            comments: res.result,//?
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
  }
})