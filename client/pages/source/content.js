//index.js
//获取应用实例
const config = require('../../config');
const app = getApp();
Page({
    data: {
        pageConfig: {
            title: "content",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
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
    getContents() {
        let that = this
        const { repo, path } = this.data
        let url = config.basic_url + repo + '/contents'
        if (path) {
            url = url + '/' + path
        }
        wx.showLoading()
        wx.request({
            url: url,
            header: {
                'Authorization': wx.getStorageSync('Authorization')
            },
            success(res) {
                console.log('success', res)
                if (res.statusCode === 403 || res.statusCode === 401) {
                    wx.setStorageSync('Authorization', '')
                    let path = getCurrentPageUrl()
                    if (path !== 'pages/login/github') {
                        wx.navigateTo({
                            url: '../login/github'
                        })
                    }
                } else if (res.statusCode === 200) {
                    that.setData({
                        dataList: res.data,
                    }, () => {
                        wx.hideLoading()
                    })
                }


            }
        })
    },
    handleItemClick(e) {
        var item = e.currentTarget.dataset.item;
        if (item.type === 'dir') {
            wx.navigateTo({
                url: 'content?repo=' + this.data.repo + '&path=' + item.path + '&name=' + item.name
            })
        } else if (item.type === 'file') {
            wx.navigateTo({
                url: 'file?url=' + item.url
            })
        }
    }
});
