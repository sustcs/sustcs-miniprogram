// pages/login/github.js
const app = getApp();
const { base64_encode } = require('../../utils/base64');
const { oauthUrl, serverUrl, school_id_len} = require('../../config.js');
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
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] === undefined || res.authSetting['scope.userInfo'] === false) {
          that.setData({
            isBind: false,
          });
        } else {
          that.setData({
            isBind: true,
          });
        }
      }
    })
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
        wx.request({
          url: oauthUrl + 'login',
          data: {
            username, password
          },
          header: {

          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.statusCode === 200) {
              let token = res.data.msg;
              wx.setStorageSync('username', username);
              wx.setStorageSync('token', token);
              app.globalData.username = username;

              const type = school_id_len[username.length];
              // bind school_id as username to openid
              wx.request({
                url: serverUrl + 'users/' + app.globalData.openid,
                data: {
                  school_id: username,
                  type
                },
                method: 'PUT',
                dataType: 'json',
                success: function (result) {
                  if (result.statusCode === 204) {
                    wx.showToast({
                      title: 'Login success',
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 2 //app -> auth -> oauth
                      })
                    }, 2000);
                  } else if (result.statusCode === 404) {
                    wx.showToast({
                      title: result.data.msg,
                      icon: 'none'
                    })

                  } else {
                    wx.showModal({
                      title: 'Error',
                      content: 'Wait for fix',
                    })
                  }
                },
              })
            } else if (res.data.statusCode === 404) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            } else {
              wx.showModal({
                title: 'Login failed',
                content: res.data.msg,
              })
            }
          },
        })
      }
    }
  },
  authorize(e) {
    const { errMsg, userInfo } = e.detail;
    let that = this;
    if (errMsg === 'getUserInfo:fail auth deny') {
      wx.showToast({
        title: errMsg,
        icon: 'none'
      })
    } else if (errMsg === 'getUserInfo:ok') {
      wx.request({
        url: serverUrl + 'users/' + app.globalData.openid,
        data: {
          username: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        },
        method: 'PUT',
        dataType: 'json',
        success: function (result) {
          if (result.statusCode === 204) {
            that.setData({
              isBind: true
            });
          } else if (result.statusCode === 404) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })

          } else {
            wx.showModal({
              title: 'Error',
              content: 'Wait for fix',
            })
          }
        },
      })

    }
  }
})