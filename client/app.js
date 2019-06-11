//app.js
const monitor = require('./agent/tingyun-mp-agent.js');
monitor.config({
  beacon: 'https://beacon-mp.tingyun.com',
  key: 'HZSiXz1e9CY',
  id: '8lgG2Jgu-R0',
  sampleRate: 1
})
const { serverUrl} = require('./config.js');
App({
  onLaunch: function () {
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    wx.cloud.init({
      env: "test-728bbc"
    });
    wx.cloud.callFunction({
      name: 'user',
      complete: res => {
        console.log(res)
        if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
          this.register(res.result.openid);
          
        } else if (res.errMsg !== 'cloud.callFunction:ok') {
          wx.showModal({
            title: res.errMsg,
            content: 'Please check the network connection',
            showCancel: false,
          })
        } else if (res.result === null) {
          console.log('cloudfunction error')
        }
      },
    })
  },
  globalData: {
    username: wx.getStorageSync('username') || null,
    token: wx.getStorageSync('token') || null,
  },
  register: function (openid) {
    var that = this;
    wx.request({
      url: serverUrl + 'users',
      data: {
        openid: openid
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if (res.statusCode === 201) {
          that.globalData.openid = openid;
          wx.showToast({
            title: 'welcome',
          })
        } else if (res.statusCode === 403) {
          that.globalData.openid = openid;
          wx.showToast({
            title: 'welcome back',
          })

        } else {
          wx.showModal({
            title: 'Error',
            content: 'Wait for fix',
          })  
        }
      },
      fail: function() {
        wx.showModal({
          title: 'Error',
          content: 'Wait for fix',
        })  
      }
    })
  }
});
