const { basic_url, repo_full_name } = require('../../config');
Page({
  data: {
    gradual: ['#FA9C05', '#F36302'],
    caption: 'https://cdn.nlark.com/yuque/0/2019/png/285274/1553229206281-assets/web-upload/12edf711-8c22-44e0-898b-2b7e6a6fc23d.png'
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading'
    })
    var path = options.path
    let url = basic_url + repo_full_name + '/contents/' + path
    wx.cloud.callFunction({
      name: 'github',
      data: {
        url: url,
        headers: {
          'Authorization': wx.getStorageSync('Authorization'),
          'User-Agent': 'request',
          'content-type': 'application/json;charset=UTF-8'
        },
      },
      complete: res => {
        console.log('cloud', res)
        // if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {

        // } else if (res.errMsg !== 'cloud.callFunction:ok') {
        //   wx.showModal({
        //     title: res.errMsg,
        //     content: 'Please check the network connection',
        //     showCancel: false,
        //   })
        // } else if (res.result === null) {
        //   console.log('cloudfunction error')
        // }
        //wx.hideLoading()
      },
    })
  }

});