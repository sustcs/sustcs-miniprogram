// pages/competition/teamList.js
const app = getApp();
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
    allRole: [{
      value: 0,
      name: 'document',
      checked: false,
    }, {
      value: 1,
      name: 'design',
      checked: false,
    }, {
      value: 2,
      name: 'administrative',
      checked: false,
    }, {
      value: 3,
      name: 'speech',
      checked: false,
    }, {
      value: 4,
      name: 'develop',
      checked: false,

    }, {
      value: 5,
      name: 'promote',
      checked: false,

    }]
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
    let items = this.data.allRole;
    let choose = e.currentTarget.dataset.value;
    var index = items.findIndex(function (item) {
      return item.value === choose
    })
    items[index].checked = !items[index].checked
    this.setData({
      allRole: items
    })
  },
  submitJoin() {
    let items = this.data.allRole;
    var applyRole = items.filter(function (item) {
      return item.checked === true
    })
    //send applyRole
    var that = this
    wx.showToast({
      title: 'success',
      icon: 'success',
      duration: 1500,
      success: (result) => {
        that.hideModal()
      }
    });

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    if (e.currentTarget.dataset.target === 'Note') {
      this.setData({
        note: e.currentTarget.dataset.item.note
      })
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

})