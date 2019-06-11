//index.js
//获取应用实例
const app = getApp();
const { serverUrl } = require('../../config.js');

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
    },
    onLoad: function () {
      let that = this;
      wx.request({
        url: serverUrl + 'introductions?enable=true',
        dataType: 'json',
        success: function (res) {
          console.log(res);
          if (res.statusCode === 200) {
            that.setData({
              allItem: res.data,
              description: res.data[0].description
            });
          } 
        },
      })
    },
    tabSelect(e) {
      var that = this
      that.setData({
        description: this.data.allItem[e.currentTarget.dataset.id].description,
        TabCur: e.currentTarget.dataset.id,
      });
    },

});
