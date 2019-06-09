//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        allItem: [
            {
                id: 0,
                name: "Course orientation",
                content: "this is the Course orientation"
            },
            {
                id: 1,
                name: "The teaching goal",
                content: "this is the teaching goal"
            },
            {
                id: 2,
                name: "Graduation requirements"
            },
            {
                id: 3,
                name: "Basic teaching content"
            },
            {
                id: 4,
                name: "The teaching method"
            },
            {
                id: 5,
                name: "evaluation mode"
            },
            {
                id: 6,
                name: "Improvement mechanisms"
            }
        ]


    },
    onLoad: function () {
        const db = wx.cloud.database()
        var that = this
        db.collection('introduction').get({
            success(res) {
                that.setData({
                    goal: res.data[0].content,
                });
            }
        })
    },
    tabSelect(e) {
        const db = wx.cloud.database()
        var that = this
        db.collection('introduction').get({
            success(res) {
                that.setData({
                    goal: res.data[e.currentTarget.dataset.id].content,
                    TabCur: e.currentTarget.dataset.id,
                });
            }
        })
    },

});
