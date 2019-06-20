//index.js
//获取应用实例
const app = getApp();
var date = new Date();
var weekday = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
const { domainPrefix } = require('../../config');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
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
        icon: "upstagefill",
        color: "olive",
        badge: 0,
        name: "Competition",
        url: "../competition/index"
      },
      {
        icon: "more",
        color: "mauve",
        badge: 0,
        name: "More",
        url: "../menu/all"
      },
      {
        icon: "explorefill",
        color: "cyan",
        badge: 0,
        name: "Seminars"
      },

      {
        icon: "lightfill",
        color: "yellow",
        badge: 0,
        name: "Job"
      },

    ],
    gridCol: 3,
    menuItem: [
      {
        icon: "myfill",
        color: "purple",
        name: "User Center",
        url: "../user/index"
      },
      {
        icon: "questionfill",
        color: "red",
        name: "Feedback",
        url: "../feedback/index"
      },
      {
        icon: "discoverfill",
        color: "blue",
        name: "About us",
        url: "../about/index"
      }
    ],
    skin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),

    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),

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

  onLoad: function () { 
    let that = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {
        version: 'v1',
        city: '西安'
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        that.setData({
          district: res.data.city,
          temprature: res.data.data[0].tem,
          weather: res.data.data[0].wea,
          air: res.data.data[0].air_level,
          advice: res.data.data[0].air_tips,
          weekday: res.data.data[0].week
        })
      },
    })
  },
  showModal(e) {
    let that = this;
    that.setData({
      modalName: e.currentTarget.dataset.target
    });
    
  },
  hideModal(e) {
    this.setData({
      modalName: null
    });
  },
  handleFuncClick(e) {
    var func = e.currentTarget.dataset.func;
    wx.navigateTo({
      url: func.url
    })
  },

  scan: function () {
    let that = this;
    this.hideModal();
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        var qrCode = res.result;
        // check qrcode 

        let legalDomain = domainPrefix.find(function(domain) {
          return qrCode.indexOf(domain) === 0;
        });
        
        if(legalDomain === undefined) {
          wx.showModal({
            title: 'Error',
            content: 'what are you scanning',
            showCancel: false,
            confirmText: 'I got it'
          })
        } else if(qrCode.indexOf(legalDomain + 'weapp') === 0) {
          var scanContent = qrCode.replace(legalDomain + 'weapp', "") + '&domain=' + legalDomain;
          wx.navigateTo({
            url: scanContent
          })
        } else {
          wx.showModal({
            title: 'please paste it into the browser open',
            content: qrCode,
            showCancel: false,
            confirmText: 'copy',
            success(res) {
              if (res.confirm) {
                  wx.setClipboardData({
                      data: qrCode,
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
            }
          })
        }
      },
    })
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
