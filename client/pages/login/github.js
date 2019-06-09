// pages/login/github.js
const app = getApp();
const { base64_encode } = require('../../utils/base64');
Page({
  data: {
    pageConfig: {
      title: "github",
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
    },
    TabCur: 0,
    method: ['Token', 'Account']
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad(options) {
  },
  login(e) {
    let authorization = '';
    if (this.data.TabCur === 0) {
      var token = e.detail.value.token;
      if (token.length === 0) {
        wx.showToast({
          title: 'Please input token',
          icon: 'none'
        })
      } else {
        authorization = 'token ' + token
      }
    } else {
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      if (username.length === 0) {
        wx.showToast({
          title: 'Please input username',
          icon: 'none'
        })
      } else if (password.length === 0) {
        wx.showToast({
          title: 'Please input password',
          icon: 'none'
        })
      } else {
        authorization = 'Basic ' + base64_encode(username + ':' + password)
      }
    }
    if (authorization.length !== 0) {
      wx.setStorageSync('Authorization', authorization)
      wx.showLoading({ title: 'loading' })
      wx.request({
        url: 'https://api.github.com/user',
        header: {
          'Authorization': wx.getStorageSync('Authorization'),
          'Accept': 'application/vnd.github.v3+json'
        },
        success(res) {

          wx.hideLoading()
          if (res.statusCode === 403 || res.statusCode === 401) {
            wx.showModal({
              title: 'Login Failed',
              content: res.data.message,
              showCancel: false,
              confirmText: 'received',
              confirmColor: '#0081ff'
            });
            wx.setStorageSync('Authorization', '')

          } else if (res.statusCode === 200) {
            wx.setStorageSync('userInfo', res.data)
            wx.showToast({
              title: 'Login success',
              icon: 'success',
              duration: 500
            })
            wx.navigateBack()
            console.log('res.data', res.data)
          }
        }
      })
    }

  }
})