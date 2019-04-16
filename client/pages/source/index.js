//index.js
//获取应用实例
const base64 = require('../../utils/base64');
const config = require('../../config');
const { getCurrentPageUrl } = require('../../utils/common');
const app = getApp();
Page({
    data: {
        pageConfig: {
            title: "github",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },
        repo: null,
        readme: null,
        baseUrl: null,
        md: null,
        gradual: ['#0081ff', '#1cbbb4'],
        caption: 'https://cdn.nlark.com/yuque/0/2019/png/285274/1553229206281-assets/web-upload/12edf711-8c22-44e0-898b-2b7e6a6fc23d.png'
    },

    onLoad: function () {
        this.getRepo()

    },
    cloneUrl: function (e) {
        console.log(e)
        if (e.currentTarget.dataset.text !== null) {
            wx.setClipboardData({
                data: e.currentTarget.dataset.text,
                success(res) {
                    if (res.errMsg == "setClipboardData:ok") {
                        wx.showToast({
                            title: 'copied',
                            icon: 'success',
                            duration: 1000
                        })
                    }
                }
            })
        }

    },

    getRepo: function () {
        let that = this

        wx.showLoading()
        wx.request({
            url: config.basic_url + config.repo_full_name,
            header: {
                'Authorization': wx.getStorageSync('Authorization')
            },
            success(res) {

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
                        repo: res.data,
                    }, () => {
                        that.getReadme(),
                            wx.hideLoading()
                    })
                }
            }
        })

    },
    getReadme() {
        let that = this
        wx.request({
            url: config.basic_url + config.repo_full_name + '/readme',
            header: {
                'Authorization': wx.getStorageSync('Authorization')
            },
            success(res) {
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
                        readme: res.data
                    }, () => {
                        that.parseReadme()

                    })
                }


            }
        })
    },
    parseReadme() {
        const { readme } = this.data
        this.setData({
            md: base64.base64_decode(readme.content)
        })
    },
});
