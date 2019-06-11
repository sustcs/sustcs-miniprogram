// Authorize external login
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
      param: options.param,
    });
  },
  data: {
    auth: {
      statusCode: 100,
    }
  },
  onUnload() {
    // this.socket.emit('auth', 'reject');
    this.disconnectSocket()
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
    } else if (errMsg === 'getUserInfo:ok') {
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
      let that = this;
      this.socket.emit('auth', {
        target: 'admin',
        payload: {
          statusCode: 1,
          msg: userInfo,
        },
      });
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);
      this.setData({
        auth: {
          statusCode: 200,
          msg: 'Auth success'
        }
      });
    }


  },
  reject: function () {
    let userInfo = this.data.userInfo;
    this.socket.emit('auth', {
      target: 'admin',
      payload: {
        statusCode: 0,
        msg: 'user reject',
      },
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 2000);
    this.setData({
      auth: {
        statusCode: 202,
        msg: 'Rejected'
      }
    });
  },
  connectSocket: function (room) {
    let that = this;
    const socket = (this.socket = io(
      serverUrl + 'qrcode', {
        query: {
          room: room,
          type: 'weapp',
        },
        transports: ['websocket']
      }
    ))
    socket.on('connect', () => {
      debug('socket.connected', socket.connected, isDebug);
    })
    socket.on('deny', function (msg) {

      wx.showModal({
        title: msg.type,
        content: msg.message,
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      });

    });

    socket.on('connect_error', err => {
      debug('error', err, isDebug);
      wx.showModal({
        title: 'Failed',
        content: 'connect_error',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      });
    })
  },
  disconnectSocket: function () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },

  onShow() {
    let that = this;
    if (app.globalData.username === null) {
      wx.showModal({
        title: 'Failed',
        content: 'Need authentication, whether to carry out unified authentication?',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/oauth'
            })
          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else {
      let room = this.data.param;
      this.connectSocket(room);
    }
  },
})