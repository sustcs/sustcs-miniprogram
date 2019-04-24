const app = getApp();
const { basic_url, repo_full_name, canFileType } = require('../../config');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    scroll: 0
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: e => {
        //适配全面屏底部距离
        if (app.globalData.CustomBar > 75) {
          this.globalData.tabbar_bottom = "y"
        }
      }
    })
    const db = wx.cloud.database()
    var that = this
    db.collection('competition').where({
      title: options.competition
    }).get({
      success(res) {
        if (res.data.length === 0) {
          wx.showModal({
            title: 'empty',
            content: 'no data',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        } else {
          that.setData({
            dataDetail: res.data[0],
            path: 'competition/' + options.competition
          });
          that.getContents(that.data.path)

        }

      }
    })
    // recource

  },
  getContents(path) {

    let that = this
    let url = basic_url + repo_full_name + '/contents/' + path
    wx.cloud.callFunction({
      name: 'github',
      data: {
        url: url,
        headers: {
          'Authorization': wx.getStorageSync('Authorization'),
          'User-Agent': 'request'
        },
      },
      complete: res => {
        if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
          var resourceList = res.result
          resourceList.map(function (currentValue, index) {
            var index = currentValue.name.lastIndexOf(".");
            var suffix = currentValue.name.substring(index + 1, currentValue.name.length);
            switch (suffix) {
              case 'doc': case 'docx':
                currentValue.fileType = 'word';
                break;
              case 'xls': case 'xlsx': case 'csv':
                currentValue.fileType = 'excel';
                break;
              case 'pdf':
                currentValue.fileType = 'pdf';
                break;
              case 'ppt': case 'pptx':
                currentValue.fileType = 'ppt';
                break;
              case 'zip': case 'rar': case 'tar': case 'gz': case '7z':
                currentValue.fileType = 'zip';
                break;
              case 'txt':
                currentValue.fileType = 'txt';
                break;
              case 'jpg': case 'jpeg': case 'png': case 'gif': case 'svg': case 'ico':
                currentValue.fileType = 'img';
                break;
              default:
                currentValue.fileType = 'file';
                break;
            }
            var size_kb = currentValue.size / 1024;
            size = size_kb >= 1 ? (size_kb.toFixed(1) + 'Kb') : currentValue.size + 'b';
            var size_Mb = size_kb / 1024;
            currentValue.size = size_Mb >= 1 ? (size_Mb.toFixed(1) + 'Mb') : size;
          });
          that.setData({
            resourceList: resourceList,
          }, () => {


          })
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
  download(e) {
    var size = e.currentTarget.dataset.size;
    var canDownload = (size.indexOf('Mb') !== -1) ? false : true;
    var that = this
    if (!canDownload) {
      wx.showModal({
        title: 'Download failed',
        content: 'File exceed the limit,The link has been copied to the clipboard, please paste it into the browser download',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.currentTarget.dataset.url,
              success(res) {
                if (res.errMsg == "setClipboardData:ok") {
                  that.setData({
                    isDetail: false
                  })
                  wx.showToast({
                    title: 'copied',
                    icon: 'success',
                    duration: 1000
                  })

                }
              }
            })

          }
        }
      })
    } else {
      wx.showLoading({
        title: 'loading',
      })
      wx.downloadFile({
        url: e.currentTarget.dataset.url,
        success(res) {
          if (res.statusCode === 200) {
            const filePath = res.tempFilePath
            wx.hideLoading()
            that.setData({
              isDetail: false
            })
            wx.showModal({
              title: 'Download succeed',
              content: 'saved to:' + filePath,
              showCancel: false,
            })
          }

        }
      })
    }

  },
  preview(e) {
    var size = e.currentTarget.dataset.size;
    var canPreviewd = (size.indexOf('Mb') !== -1) ? false : true;
    var that = this
    if (!canPreviewd) {
      wx.showModal({
        title: 'File exceed',
        content: 'The link has been copied to the clipboard, please paste it into the browser',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.currentTarget.dataset.url,
            })
            that.setData({
              isDetail: false
            })
          }
        }
      })
    } else {
      var index = e.currentTarget.dataset.name.lastIndexOf(".");
      var suffix = e.currentTarget.dataset.name.substring(index + 1, e.currentTarget.dataset.name.length);
      wx.showLoading({
        title: 'loading',
      })
      if (suffix === 'md') {
        wx.navigateTo({
          url: 'preview?url=' + e.currentTarget.dataset.url + '&name=' + e.currentTarget.dataset.name,
          success(res) {
            wx.hideLoading()
            that.setData({
              isDetail: false
            })
          }
        })

      } else if (canFileType.indexOf(suffix) > -1) {
        wx.downloadFile({
          url: e.currentTarget.dataset.url,
          success(res) {
            if (res.statusCode === 200) {
              const filePath = res.tempFilePath
              wx.openDocument({
                filePath,
                fileType: suffix,
                success(res) {
                  wx.hideLoading()
                  that.setData({
                    isDetail: false
                  })
                }
              })
            }

          }
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: 'Unsupported File types',
          icon: 'none',
          duration: 1000
        })
      }
    }
  },
  forward() {
    wx.showToast({
      title: 'Temporarily unavailable'
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    if (this.data.modalName === 'fileDetail') {
      this.setData({
        fileDetail: e.currentTarget.dataset.item
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  more(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }

});