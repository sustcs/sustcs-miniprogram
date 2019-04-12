//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  onLoad: function() {},
  weChat: function() {
    wx.login({
      success(res) {
        // wx.showToast({
        //   title: res.errMsg,
        //   icon: "success",
        //   duration: 2000
        // });
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: "https://dtofih-80-gpedqh.dev.ide.live/login",
            data: {
              code: res.code
            },
            method: "GET",
            success: function(res) {
              var session_data = res.data.session_data;
              var session_id = session_data.session_id;
              var expires = session_data.expires;
              var data = session_data.data;
              wx.setStorageSync("session_id", session_id);
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
      fail(res) {
        wx.showModal({
          title: "err",
          content: res.errMsg
        });
      }
    });
  },
  testCloud: function() {
    wx.cloud.callFunction({
      // 云函数名称
      name: "add",
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2
      },
      success(res) {
        console.log(res.result); // 3
      },
      fail: console.error
    });
  }
});
