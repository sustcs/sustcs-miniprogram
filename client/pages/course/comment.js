//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        pageConfig: {
            title: "comment",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },
        multiArray: [
            ['2015-2016', '2016-2017', '2017-2018', '2018-2019'],
            ['semester one', 'semester two']
        ],
        multiIndex: [0, 0],
        tagList: [
            {
                id: 1,
                name: 'cool',
                color: 'red'
            },
            {
                id: 2,
                name: 'fun',
                color: 'orange'
            }, {
                id: 3,
                name: 'strict',
                color: 'yellow'
            }, {
                id: 4,
                name: 'interesting',
                color: 'olive'
            }, {
                id: 5,
                name: 'important',
                color: 'green'
            }, {
                id: 6,
                name: 'boring',
                color: 'cyan'
            }, {
                id: 7,
                name: 'vivid',
                color: 'blue'
            },

        ]

    },
    MultiChange(e) {
        this.setData({
            multiIndex: e.detail.value
        })
    },
    MultiColumnChange(e) {
        let data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;

        this.setData(data);
    },
    onLoad: function () { },
    bindFormSubmit(e) {
        wx.showToast({
            title: 'success',
            icon: 'success',
            duration: 2000,
            success: function () {
                wx.redirectTo({
                    url: 'detail'
                })
            }
        })

    },
    saveDraft() {
        wx.showToast({
            title: 'saved',
            icon: 'success',
            duration: 2000
        })
    }
});
