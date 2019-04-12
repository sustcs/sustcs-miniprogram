//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        pageConfig: {
            title: "review",
            StatusBar: app.globalData.StatusBar,
            CustomBar: app.globalData.CustomBar,
        },
        comments: [
            {
                id: 1,
                name: "Mike",
                avatar: "https://image.weilanwl.com/img/square-1.jpg",
                commentsShort: "so good",
                completedTime: "2018-10-08",
                url: "detail"
            },
            {
                id: 1,
                name: "Mike",
                avatar: "https://image.weilanwl.com/img/square-1.jpg",
                commentsShort: "so good",
                completedTime: "2018-10-08",
                url: "detail"
            },
            {
                id: 1,
                name: "Mike",
                avatar: "https://image.weilanwl.com/img/square-1.jpg",
                commentsShort: "so good",
                completedTime: "2018-10-08",
                url: "detail"
            },
            {
                id: 1,
                name: "Mike",
                avatar: "https://image.weilanwl.com/img/square-1.jpg",
                commentsShort: "so good",
                completedTime: "2018-10-08",
                url: "detail"
            },
            {
                id: 1,
                name: "Mike",
                avatar: "https://image.weilanwl.com/img/square-1.jpg",
                commentsShort: "so good",
                completedTime: "2018-10-08",
                url: "detail"
            }
        ]


    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    agree(e) {

    },
    onLoad: function () { },
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
