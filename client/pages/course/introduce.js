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
    onLoad: function () { },
    tabSelect(e) {
        console.log(e);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        });
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
