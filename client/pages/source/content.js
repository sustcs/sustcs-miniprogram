//index.js
//获取应用实例
const config = require('../../config');
const app = getApp();
const canFileType = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
Page({
    data: {
        pageConfig: {
            title: "content",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },
        fileDetail: {
            name: '',
            size: '',
            download_url: '',
            update_time: ''
        }
    },

    onLoad: function (params) {
        this.setData({
            repo: params.repo,
            path: params.path || null,
            name: params.name || null
        })
        this.getContents()
    },
    hideModal(e) {
        this.setData({
            isDetail: false
        })
    },
    getContents() {
        wx.showLoading({
            title: 'loading'
        })
        let that = this
        const { repo, path } = this.data
        let url = config.basic_url + repo + '/contents'
        if (path) {
            url = url + '/' + path
        }
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
                console.log(res)
                if (res.errMsg === 'cloud.callFunction:ok' && res.result !== null) {
                    that.setData({
                        dataList: res.result,
                    }, () => {
                        wx.hideLoading()
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
                // if (res.statusCode === 403 || res.statusCode === 401) {
                //     wx.setStorageSync('Authorization', '')
                //     let path = getCurrentPageUrl()
                //     if (path !== 'pages/login/github') {
                //         wx.navigateTo({
                //             url: '../login/github'
                //         })
                //     }
                // } else if (res.statusCode === 200) {
                // }
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
    handleItemClick(e) {
        var item = e.currentTarget.dataset.item;
        if (item.type === 'dir') {
            wx.navigateTo({
                url: 'content?repo=' + this.data.repo + '&path=' + item.path + '&name=' + item.name
            })
        } else if (item.type === 'file') {
            var size_kb = item.size / 1024;
            size = size_kb >= 1 ? (size_kb.toFixed(1) + 'Kb') : item.size + 'b';
            var size_Mb = size_kb / 1024;
            size = size_Mb >= 1 ? (size_Mb.toFixed(1) + 'Mb') : size;
            this.setData({
                isDetail: true,
                fileDetail: {
                    name: item.name,
                    size: size,
                    download_url: item.download_url,
                    update_time: ''
                }
            })

        }
    },
    forward() {
        wx.showToast({
            title: 'Temporarily unavailable'
        })
    }
});
