// pages/login/github.js
const app = getApp();
const { base64_encode } = require('../../utils/base64');
const { oauthUrl} = require('../../config.js');
Page({
  data: {
    pageConfig: {
      title: "github",
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
    },
    TabCur: 1,
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
        wx,wx.request({
          url: oauthUrl,
          data: {
            username,password
          },
          header: {
            
          },
          method: 'POST',
          dataType: 'json',
          success: function(res) {
            console.log(res);
            if(rs.data.statusCode === 1) {
              let token = res.data.msg;
              wx.setStorageSync('token', token);
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: 'Wrong account or password',
                icon: 'none'
              })
            }

          },
        })
      }

    }
    
  }
})