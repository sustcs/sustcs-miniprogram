// pages/auth/auth.js
const io = require('../../utils/weapp.socket.io.js');
const { debug } = require('../../utils/common.js');
const { serverUrl } = require('../../config');
let app = getApp();
const isDebug = app.globalData.isDebug;
Page({
  onLoad: function (options) {
    this.setData({
      domain: options.domain,
      action: options.action,
      // userInfo: {
      //   openid: res.result.openid,
      // }
    });
  },
  data: {
    auth: {
      statusCode: 100,
    }
  },
  onUnload() {

  },
  authorize: function (e) {
    const { errMsg, userInfo } = e.detail;
    let that = this;
    if (errMsg === 'getUserInfo:fail auth deny') {
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 1000);
      this.setData({
        auth: {
          statusCode: 202,
          msg: 'Rejected'
        }
      });
    } else if (errMsg === 'getUserInfo:ok'){
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
      this.setData({
        auth: {
          statusCode: 200,
          msg: 'Welcome ' + userInfo.nickName
        }
      });
    }
  },
  reject: function () {
    setTimeout(function () {
      wx.navigateBack({
        delta: 2
      })
    }, 1000);
    this.setData({
      auth: {
        statusCode: 202,
        msg: 'Rejected'
      }
    });
  },
})