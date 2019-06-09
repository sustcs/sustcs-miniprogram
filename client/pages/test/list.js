// pages/test/list.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  getData: function () {
    const db = wx.cloud.database({});
    db.collection('namecard').get().then((res) => {
      let data = res.data;
      this.setData({
        list: data
      });
    }).catch(e => {
      wx.showToast({
        title: 'db读取失败',
        icon: 'none'
      });
    });
  },
  getDetail: function () {
    let _id = e.currentTarget.dataset.namecardid;
    app.globalData.namecard.id = _id;

    wx.navigateTo({
      url: './detail'
    });
  }
})