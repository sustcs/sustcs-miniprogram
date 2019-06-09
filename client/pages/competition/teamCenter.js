// pages/competition/teamList.js
const app = getApp();
const { timeago } = require('../../utils/common');

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
          name: 'John',
          avatar: '',
          role: 'captain',
          academy: '经管学院金融',
          joinTime: '2018-5-9',
          phone: '18866889788',

        },
        {
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
        method: "invite"
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
        method: "download"
      },

    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //team = request(options.teamId)
    this.setData({
      //team: team
    })
   
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'join us',
      path: '/pages/auth/join?domain=' + this.data.team.id + '&action=join'
    }
  },

  chat() {
    wx.navigateTo({
      url: './teamChat?teamid=' + this.data.team.id
    })
  },
  invite() {
    wx.showToast({
      title: 'Please use the upper right corner to forward',
      icon: 'none',
      duration: 2000
    })

  },
  leave() {
    wx.navigateTo({
      url: '/pages/auth/join?domain=' + this.data.team.id + '&action=leave'
    })
    // wx.showModal({
    //   title: 'Are you sure?',
    //   content: 'Once you exit all data about you will be cleared',
    //   success(res) {
    //     if (res.confirm) {
    //       wx.request({
    //         url: '',
    //       })
    //     } else if (res.cancel) {
    //       wx.showToast({
    //         title: 'Keep calm',
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })

  },
  edit() {
    wx.navigateTo({
      url: './teamBuild?teamId=' + this.data.team.id
    })
  },
  download() {
    
  }
})