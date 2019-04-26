// pages/test/detail.js
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
  getNameCardDetail: function () {
    // 云函数新接口，用于获取数据库中数据
    const db = wx.cloud.database({});
    let ncId = app.globalData.namecard.id;
    db.collection('namecard').doc(ncId).get().then(res => {
      console.log('db读取成功', res.data);
      let data = res.data;

      let namecard = [];
      Object.keys(data).forEach((item) => {
        if (item === 'cover' || item === '_id'
          || item === '_openid') {
          return;
        }
        namecard.push({
          name: mapping[item],
          value: data[item]
        });
      });

      this.setData({
        cover: data.cover,
        namecard: namecard
      });
    })
      .catch(e => {
        wx.showToast({
          title: 'db读取失败',
          icon: 'none'
        });
      });
  }
})