//index.js
//获取应用实例
var api = require('../../service/api.js');
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
        //wx.showLoading()
        let that = this
        var url = 'https://api.github.com/repos/sustcs/course';
        console.log(api.get(url));
        // api.get(url).then((res) => {
        //     if (res.statusCode === HTTP_STATUS.SUCCESS) {
        //         let baseUrl = 'https://raw.githubusercontent.com/' + res.data.full_name + '/master/'
        //         that.setData({
        //             repo: res.data,
        //             baseUrl: baseUrl
        //         }, () => {
        //             that.getReadme()
        //             that.checkStarring()
        //             // that.checkWatching()
        //         })
        //     } else {
        //         wx.showToast({
        //             icon: 'none',
        //             title: res.data.message
        //         })
        //     }
        //     // wx.stopPullDownRefresh()
        //     wx.hideLoading()
        // })

    },
    getReadme() {
        const { repo } = this.state
        let url = '/repos/' + repo.full_name + '/readme'
        let that = this
        api.get(url).then((res) => {
            that.setState({
                readme: res.data
            }, () => {
                that.parseReadme()
            })
        })
    },
    parseReadme() {
        const { readme } = this.state
        this.setState({
            md: base64_decode(readme.content)
        })
    },
    checkStarring() {
        if (hasLogin()) {
            const { repo } = this.state
            let that = this
            let url = '/user/starred/' + repo.full_name
            api.get(url).then((res) => {
                that.setState({
                    hasStar: res.statusCode === 204
                })
            })
        }
    }
});
