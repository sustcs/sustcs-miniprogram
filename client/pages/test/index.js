// pages/test/index.js
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
  uploadFile: function () {
    wx.chooseImage({
      success: dRes => {
        // 展示加载组件
        wx.showLoading({
          title: '上传文件',
        });

        let cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}.png`;

        // 云开发新接口，用于上传文件
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: dRes.tempFilePaths[0],
          success: res => {
            if (res.statusCode < 300) {
              this.setData({
                fileID: res.fileID,
              }, () => {
                // 获取临时链接
                this.getTempFileURL();
              });
            }
          },
          fail: err => {
            // 隐藏加载组件并提示
            wx.hideLoading();
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          },
        })
      },
      fail: console.error,
    })
  },
  getTempFileURL: function () {
    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: this.data.fileID,
      }],
    }).then(res => {
      console.log('获取成功', res);
      let files = res.fileList;

      if (files.length) {
        this.setData({
          coverImage: files[0].tempFileURL
        }, () => {
          this.parseNameCard();
        });
      }
      else {
        wx.showToast({
          title: '获取图片链接失败',
          icon: 'none'
        });
      }

    }).catch(err => {
      console.error('获取失败', err);
      wx.showToast({
        title: '获取图片链接失败',
        icon: 'none'
      });
      wx.hideLoading();
    });
  },
  addNameCard: function () {
    const data = this.data
    const formData = e.detail.value;

    wx.showLoading({
      title: '添加中'
    });

    formData.cover = this.data.fileID;

    const db = wx.cloud.database();
    db.collection('namecard').add({
      data: formData
    }).then((res) => {
      wx.hideLoading();

      app.globalData.namecard.id = res._id;

      wx.navigateTo({
        url: '../detail/index'
      });

      // 重置数据
      this.setData({
        coverImage: null,
        fileID: null,
        formData: []
      });

    }).catch((e) => {
      wx.hideLoading();
      wx.showToast({
        title: '添加失败，请重试',
        icon: 'none'
      });
    });
  },
  parseNameCard: function () {
    wx.showLoading({
      title: '解析名片',
    });

    // 云开发新接口，调用云函数
    wx.cloud.callFunction({
      name: 'parseNameCard',
      data: {
        url: this.data.coverImage
      }
    }).then(res => {
      if (res.code || !res.result || !res.result.data) {
        wx.showToast({
          title: '解析失败，请重试',
          icon: 'none'
        });
        wx.hideLoading();
        return;
      }

      let data = this.transformMapping(res.result.data);
      this.setData({
        formData: data
      });

      wx.hideLoading();
    }).catch(err => {
      console.error('解析失败，请重试。', err);
      wx.showToast({
        title: '解析失败，请重试',
        icon: 'none'
      });
      wx.hideLoading();
    });
  }
})