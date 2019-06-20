// pages/competition/teamList.js
const app = getApp();
const { timeago, searchFromJsonArray } = require('../../utils/common');
Page({

  /**
   * Page initial data
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    team: {
      name: 'Houston Rockets',
      id: '666666',
      member: [
        {
          school_id: '201506021019',
          name: 'John',
          avatar: '',
          role: 'captain',
          academy: '经管学院金融',
          joinTime: '2018-5-9',
          phone: '18866889788',

        },
        {
          school_id: '201506001111',
          name: 'Mike',
          avatar: '',
          role: '会计',
          academy: '电信学院网络',
          joinTime: '2018-5-１０',
          phone: '18866889788',
        }
      ]
    },
    funcList: [
      {
        icon: 'we',
        color: "green",
        badge: 0,
        name: "Chat",
        method: "chat",
      },
      {
        icon: "friendadd",
        color: "orange",
        badge: 0,
        name: "Invite",
        method: "showModal"
      }, {
        icon: "exit",
        color: "red",
        badge: 0,
        name: "Leave",
        method: "leave"
      }, {
        icon: "edit",
        color: "yellow",
        badge: 0,
        name: "Edit",
        method: "edit"
      },
      {
        icon: "down",
        color: "blue",
        badge: 0,
        name: "Download",
        method: "other"
      },

    ],
    allRole: ['会计', '金融', '行政', '财务', '前台', '人事',],
    role: '会计',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // load data
   
  },
  onShow: function() {
    
    let result = searchFromJsonArray(this.data.team.member, 'school_id', app.globalData.username);
    if (result.length === 0) {
      wx.showModal({
        title: 'Failed',
        content: 'You are not a member of this team',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      return {
        title: 'join us',
        path: '/pages/auth/join?domain=' + this.data.team.id + '&action=join' + '&param=' + this.data.role
      }
    }
  },

  chat() {
    wx.navigateTo({
      url: './teamChat?teamid=' + this.data.team.id
    })
  },
  leave() {
    let role = searchFromJsonArray(this.data.team.member, 'school_id', app.globalData.username)[0].role;
    wx.navigateTo({
      url: '/pages/auth/join?domain=' + this.data.team.id + '&action=leave' + '&param=' + role
    })
  },
  edit() {
    wx.navigateTo({
      url: './teamBuild?teamId=' + this.data.team.id
    })
  },
  other() {
    wx.showToast({
      title: 'Temporarily not opened',
      icon: 'none',
      duration: 2000
    })
  },
  ChooseCheckbox(e) {
    this.setData({
      role: e.currentTarget.dataset.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: 'ChooseRole'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})