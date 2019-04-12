//index.js
//获取应用实例
const app = getApp();
var date = new Date();
var weekday = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    funcList: [
      {
        icon: "cardboardfill",
        color: "red",
        badge: 0,
        name: "Introduction	"
      },
      {
        icon: "group_fill",
        color: "orange",
        badge: 0,
        name: "Course",
        url: "../course/index"
      },
      {
        icon: "peoplefill",
        color: "yellow",
        badge: 0,
        name: "Teacher",
        url: "../teacher/index"
      },
      {
        icon: "discoverfill",
        color: "olive",
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
        color: "blue",
        badge: 0,
        name: "Competition"
      },
      {
        icon: "lightfill",
        color: "purple",
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
    gridCol: 4,
    menuItem: [
      {
        icon: "myfill",
        color: "purple",
        badge: 120,
        name: "User Center",
        url: "../user/index"
      },
      {
        icon: "questionfill",
        color: "red",
        badge: 120,
        name: "Feedback",
        url: "../feedback/index"
      },
      {
        icon: "discoverfill",
        color: "blue",
        badge: 120,
        name: "About us",
        url: "../about/index"
      }
    ],
    skin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),

    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekday: weekday[date.getDay()],
    week: 1,
    district: "Weiyang District",
    temprature: "",
    weather: "sunny",
    air: 120,
    advice: "wear coat",

    courseList: [
      {
        id: "1",
        name: "English",
        time: "1-2",
        room: "F101",
        color: "red",
        type: "subject",
        teacher: "Mike",
        url: ""
      },
      {
        id: "2",
        name: "Math",
        time: "3-4",
        room: "F101",
        color: "blue",
        type: "subject",
        teacher: "Mike",
        url: ""
      },
      {
        id: "3",
        name: "Computer",
        time: "7-8",
        room: "F101",
        color: "green",
        type: "subject",
        teacher: "Mike",
        url: ""
      }
    ],
    activityList: [
      {
        id: "1",
        name: "English",
        time: "18:30",
        room: "F101",
        color: "red",
        type: "subject",
        info: "this is info",
        url: ""
      },
      {
        id: "2",
        name: "Math",
        time: "18:30",
        room: "F101",
        color: "blue",
        type: "subject",
        info: "this is info",
        url: ""
      },
      {
        id: "3",
        name: "Computer",
        time: "18:30",
        room: "F101",
        color: "green",
        type: "subject",
        info: "this is info",
        url: ""
      }
    ]
  },
  //事件处理函数

  onLoad: function () { },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    });
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection:
        e.touches[0].pageX - this.data.ListTouchStart > 0 ? "right" : "left"
    });
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == "left") {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
    } else {
      this.setData({
        modalName: null
      });
    }
    this.setData({
      ListTouchDirection: null
    });
  }
});
