const app = getApp();
Page({
  data: {
    gradual: ['#FA9C05', '#F36302'],

    dataDetail: {
      title: '2019 -- 中国高校计算机大赛',
      description: '微信小程序应用开发赛',
      caption: 'https://cdn.nlark.com/yuque/0/2019/png/285274/1553229206281-assets/web-upload/12edf711-8c22-44e0-898b-2b7e6a6fc23d.png',
      state: '初赛-报名',
      time: '2019年3月5日',
      timeLineUrl: 'schedule'
    },
    funcList: [
      {
        icon: 'cardboardfill',
        color: "red",
        badge: 0,
        name: "Introduction	",
        url: "../introduction/index"
      },
      {
        icon: "voicefill",
        color: "orange",
        badge: 0,
        name: "Course",
        url: "../course/index"
      },
      {
        icon: "peoplefill",
        color: "purple",
        badge: 0,
        name: "Teacher",
        url: "../teacher/indexes"
      },
      {
        icon: "discoverfill",
        color: "blue",
        badge: 22,
        name: "Source",
        url: "../source/index"
      },
      {
        icon: "explorefill",
        color: "cyan",
        badge: 0,
        name: "Seminars"
      },
      {
        icon: "upstagefill",
        color: "olive",
        badge: 0,
        name: "Competition",
        url: "../competition/index"
      },
      {
        icon: "lightfill",
        color: "yellow",
        badge: 0,
        name: "Exam"
      },
      {
        icon: "more",
        color: "mauve",
        badge: 0,
        name: "More",
        url: "../menu/all"
      }
    ],
    gridCol: 3,
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: e => {
        //适配全面屏底部距离
        if (app.globalData.CustomBar > 75) {
          this.setData({
            TabbarBot: 'y'
          })
        }
      }
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