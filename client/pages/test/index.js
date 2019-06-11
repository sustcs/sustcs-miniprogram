Page({
  data: {
    logs:''
  },
  onLoad: function () {
    this.setData({
      storage: wx.getStorageSync('username')
    })
  }
})