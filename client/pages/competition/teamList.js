// pages/competition/teamList.js
const app = getApp();
const { searchFromJsonArray } = require('../../utils/common');
Page({

  /**
   * Page initial data
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    teamList: [
      {
        name: 'Houston Rockets',
        id: '666666',
        captain: 'John',
        state: true,
        note: 'We currently need a full stack developer.',
        isShow: true
      }, {
        name: 'Los Angeles Lakers',
        id: '666666',
        captain: 'John',
        state: false,
        note: "we don't need anyone now.",
        isShow: true
      }
    ],
        allRole: ['会计','金融','行政','财务','前台','人事',],
        role: '会计',

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      competition: options.competition
    })
  },
  searchTeam(e) {
    let key = e.detail.value.toLowerCase();
    let list = this.data.teamList;
    for (let i = 0; i < list.length; i++) {
      let a = key;
      let b = list[i].name.toLowerCase();
      if (b.search(a) != -1) {
        list[i].isShow = true
      } else {
        list[i].isShow = false
      }
    }
    this.setData({
      teamList: list
    })
  },
  ChooseCheckbox(e) {
    this.setData({
      role: e.currentTarget.dataset.value
    })
  },
  submitJoin() {
    let role = this.data.role;
    let teamId = this.data.team.id;
    this.hideModal();
    wx.navigateTo({
      url: '/pages/auth/join?domain=' + teamId +  '&action=apply' + '&param=' + role,
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    if (e.currentTarget.dataset.target === 'Note') {
      this.setData({
        note: e.currentTarget.dataset.item.note
      })
    } else {
      let team = searchFromJsonArray(this.data.teamList, 'id', e.currentTarget.dataset.item.id)[0];
      this.setData({
        team: team
      })
    }
  },
  viewDetail(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.target,
      success: (result) => {

      },
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

})